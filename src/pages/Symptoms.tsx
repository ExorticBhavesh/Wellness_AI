import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RiskBadge } from '@/components/ui/risk-badge';
import { SymptomHistoryTimeline } from '@/components/symptoms/SymptomHistoryTimeline';
import { SYMPTOMS_LIST, SYMPTOM_CATEGORIES, MEDICAL_DISCLAIMER } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2,
  Stethoscope,
  AlertTriangle,
  Sparkles,
  History,
  Volume2
} from 'lucide-react';

export default function SymptomsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    riskLevel: 'low' | 'medium' | 'high';
    analysis: string;
    recommendations: string[];
  } | null>(null);

  /* 🔊 TEXT TO SPEECH */
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      toast({ title: 'Please select at least one symptom', variant: 'destructive' });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-symptoms', {
        body: { symptoms: selectedSymptoms },
      });

      if (error) throw error;

      setResult(data);

      // 🔊 SPEAK AI RESULT
      speak(
        `Risk level is ${data.riskLevel}. ${data.analysis}. Recommendations are ${data.recommendations.join(
          ', '
        )}`
      );

      if (user) {
        await supabase.from('symptom_checks').insert({
          user_id: user.id,
          symptoms: selectedSymptoms,
          risk_level: data.riskLevel,
          ai_analysis: data.analysis,
          recommendations: data.recommendations,
        });
      }
    } catch {
      toast({
        title: 'Analysis failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const groupedSymptoms = SYMPTOMS_LIST.reduce((acc, symptom) => {
    if (!acc[symptom.category]) acc[symptom.category] = [];
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as Record<string, typeof SYMPTOMS_LIST[number][]>);

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in text-foreground">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">AI Symptom Checker</h1>
          <p className="text-muted-foreground">
            Select your symptoms for an AI-powered health assessment
          </p>
        </div>

        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="flex gap-4 p-4">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <p className="text-sm text-muted-foreground">{MEDICAL_DISCLAIMER}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="checker">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="checker">
              <Stethoscope className="h-4 w-4 mr-2" />
              Checker
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checker">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {Object.entries(groupedSymptoms).map(([category, symptoms]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        {SYMPTOM_CATEGORIES[category as keyof typeof SYMPTOM_CATEGORIES]?.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2 sm:grid-cols-2">
                      {symptoms.map((s) => (
                        <label key={s.id} className="flex gap-3 border p-3 rounded-lg cursor-pointer">
                          <Checkbox
                            checked={selectedSymptoms.includes(s.id)}
                            onCheckedChange={() => toggleSymptom(s.id)}
                          />
                          <span className="text-sm">{s.label}</span>
                        </label>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Analysis</CardTitle>
                  <CardDescription>
                    {selectedSymptoms.length} symptom selected
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={analyzeSymptoms}
                    disabled={isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <Sparkles className="mr-2" />
                    )}
                    Analyze
                  </Button>

                  {result && (
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">Risk Level</span>
                        <RiskBadge riskLevel={result.riskLevel} />
                      </div>

                      <p className="text-sm text-foreground">{result.analysis}</p>

                      <ul className="text-sm space-y-1 text-foreground">
                        {result.recommendations.map((r, i) => (
                          <li key={i}>• {r}</li>
                        ))}
                      </ul>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          speak(
                            `${result.analysis}. ${result.recommendations.join(', ')}`
                          )
                        }
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Listen Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <SymptomHistoryTimeline />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
