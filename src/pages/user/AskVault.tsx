
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

type QueryResult = {
  id: string;
  query: string;
  result: any;
  type: "text" | "table" | "chart";
};

const sampleMessages: Message[] = [
  {
    id: "1",
    content: "What is the total buy and sell quantity for FUT_W_D26?",
    sender: "user",
    timestamp: new Date(2025, 5, 4, 10, 15),
  },
  {
    id: "2",
    content: "For instrument FUT_W_D26 (Wheat December 2026):\n\nSource Systems Total:\n• Buy Quantity: 12 MT\n• Sell Quantity: 8 MT\n\nDestination System:\n• Buy Quantity: 12 MT\n• Sell Quantity: 8 MT\n\nThe quantities match perfectly between source and destination systems, indicating successful reconciliation for this instrument.",
    sender: "assistant",
    timestamp: new Date(2025, 5, 4, 10, 15),
  },
  {
    id: "3", 
    content: "Show me positions for client SAM across all source systems.",
    sender: "user",
    timestamp: new Date(2025, 5, 4, 10, 17),
  },
  {
    id: "4",
    content: "Client SAM positions across source systems:\n\n**IND_CM_ABC_1 (India):**\n• FUT_W_D26: Buy 10 MT, Sell 2 MT, Net +8 MT\n• FUT_C_M26: Buy 50 MT, Sell 30 MT, Net +20 MT\n\n**USA_CM_ABC_1 (USA):**\n• FUT_W_D26: Buy 2 MT, Sell 6 MT, Net -4 MT\n• FUT_S_N26: Buy 25 MT, Sell 15 MT, Net +10 MT\n\n**Total Net Position: +34 MT**\nSAM has predominantly long positions across instruments.",
    sender: "assistant",
    timestamp: new Date(2025, 5, 4, 10, 17),
  },
];

const sampleQueryResults: QueryResult[] = [
  {
    id: "1",
    query: "Total quantities for FUT_W_D26",
    result: {
      data: [
        { system: "Source Total", buyQty: 12, sellQty: 8 },
        { system: "Destination", buyQty: 12, sellQty: 8 },
      ],
    },
    type: "chart",
  },
  {
    id: "2",
    query: "Client SAM position analysis",
    result: {
      data: [
        { instrument: "FUT_W_D26", netPosition: 4 },
        { instrument: "FUT_C_M26", netPosition: 20 },
        { instrument: "FUT_S_N26", netPosition: 10 },
      ],
    },
    type: "chart",
  },
];

const AskVault = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState("");
  const [savedQueries, setSavedQueries] = useState<QueryResult[]>(sampleQueryResults);

  const demoQuestions = [
    "What is the total buy and sell quantity for FUT_W_D26?",
    "Show me positions for client SAM across all source systems.",
    "Which instruments have unmatched quantities between source and destination?",
    "What is the net position (Buy - Sell) for each client?",
    "List instruments where sell quantity is greater than buy quantity.",
    "Are there any instruments with zero position?"
  ];

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const responseContent = generateResponse(inputValue);
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

  const generateResponse = (query: string): string => {
    const responses = [
      "Based on reconciliation analysis, I found discrepancies in 3 instruments. FUT_C_M26 shows a variance of +2 MT in buy quantity between source systems and destination. This requires investigation.",
      "Net position analysis shows Client ALEX has the highest exposure with +45 MT across all instruments, while Client SAM maintains a balanced portfolio with +34 MT net long position.",
      "Risk analysis indicates that 2 instruments (FUT_S_N26, FUT_B_J26) have sell quantities exceeding buy quantities, creating short positions that may require margin adjustments.",
      "Position reconciliation complete: 87% of trades match perfectly between source and destination systems. 13% show minor timing differences due to settlement delays.",
      "Data quality check reveals all instrument prices are current as of today. No stale pricing detected. Settlement prices range from $85.50 to $125.75 across the portfolio.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <AppShell userType="user">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">AskVault</h1>
            <p className="text-muted-foreground">
              Unlock answers from your trading data with AI-powered reconciliation insights
            </p>
          </div>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <Card className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about positions, reconciliation, or risk analysis..."
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </Card>
          </div>

          <div className="w-80 flex flex-col">
            <Tabs defaultValue="questions" className="flex-1 flex flex-col">
              <TabsList className="w-full">
                <TabsTrigger value="questions" className="flex-1">
                  Sample Questions
                </TabsTrigger>
                <TabsTrigger value="visualizations" className="flex-1">
                  Charts
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  Saved
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="questions"
                className="flex-1 overflow-hidden flex flex-col mt-0"
              >
                <Card className="flex-1 overflow-y-auto">
                  <CardContent className="p-4 space-y-2">
                    {demoQuestions.map((question, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors text-sm"
                        onClick={() => handleQuestionClick(question)}
                      >
                        {question}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                value="visualizations"
                className="flex-1 overflow-hidden flex flex-col mt-0"
              >
                <Card className="flex-1 overflow-y-auto">
                  <CardContent className="p-4 space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="text-sm font-medium mb-2">
                        Position Reconciliation Status
                      </div>
                      <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                        Donut chart: 87% Matched, 13% Pending
                      </div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="text-sm font-medium mb-2">
                        Net Position by Instrument
                      </div>
                      <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                        Bar chart: Position analysis
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                value="saved"
                className="flex-1 overflow-hidden flex flex-col mt-0"
              >
                <Card className="flex-1 overflow-y-auto">
                  <CardContent className="p-4 space-y-2">
                    {savedQueries.map((query) => (
                      <div
                        key={query.id}
                        className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="font-medium">{query.query}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          June 4, 2025
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default AskVault;
