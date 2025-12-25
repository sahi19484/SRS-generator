import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Save, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SRSData {
  // Document Header
  title: string;
  authors: string;
  affiliation: string;
  address: string;
  date: string;
  version: string;
  
  // Introduction
  purpose: string;
  scope: string;
  overview: string;
  
  // General Description
  generalDescription: string;
  
  // Requirements
  functionalRequirements: string;
  interfaceRequirements: string;
  performanceRequirements: string;
  designConstraints: string;
  nonFunctionalAttributes: string;
  
  // Project Details
  scheduleAndBudget: string;
  appendices: string;
}

export default function Index() {
  const [srsData, setSrsData] = useState<SRSData>({
    title: '',
    authors: '',
    affiliation: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    version: '1.0',
    purpose: '',
    scope: '',
    overview: '',
    generalDescription: '',
    functionalRequirements: '',
    interfaceRequirements: '',
    performanceRequirements: '',
    designConstraints: '',
    nonFunctionalAttributes: '',
    scheduleAndBudget: '',
    appendices: ''
  });

  const [activeTab, setActiveTab] = useState('header');
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleInputChange = (field: keyof SRSData, value: string) => {
    setSrsData(prev => ({ ...prev, [field]: value }));
  };

  const exportDocument = () => {
    const content = generateDocumentContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${srsData.title || 'SRS-Document'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateDocumentContent = () => {
    return `
SOFTWARE REQUIREMENT SPECIFICATION (SRS)

Document Title: ${srsData.title}
Author(s): ${srsData.authors}
Affiliation: ${srsData.affiliation}
Address: ${srsData.address}
Date: ${srsData.date}
Document Version: ${srsData.version}

================================================================================

1. INTRODUCTION

1.1 Purpose of this Document
${srsData.purpose}

1.2 Scope of this Document
${srsData.scope}

1.3 Overview
${srsData.overview}

================================================================================

2. GENERAL DESCRIPTION
${srsData.generalDescription}

================================================================================

3. FUNCTIONAL REQUIREMENTS
${srsData.functionalRequirements}

================================================================================

4. INTERFACE REQUIREMENTS
${srsData.interfaceRequirements}

================================================================================

5. PERFORMANCE REQUIREMENTS
${srsData.performanceRequirements}

================================================================================

6. DESIGN CONSTRAINTS
${srsData.designConstraints}

================================================================================

7. NON-FUNCTIONAL ATTRIBUTES
${srsData.nonFunctionalAttributes}

================================================================================

8. PRELIMINARY SCHEDULE AND BUDGET
${srsData.scheduleAndBudget}

================================================================================

9. APPENDICES
${srsData.appendices}

================================================================================
`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">SRS Document Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional Software Requirement Specification documents with ease. 
            Follow industry standards and best practices for comprehensive software documentation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Document Creation
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Fill in all sections to create a comprehensive SRS document
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="header">Header</TabsTrigger>
                    <TabsTrigger value="intro">Introduction</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="header" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Document Title</Label>
                        <Input
                          id="title"
                          value={srsData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="e.g., E-Commerce Platform SRS"
                        />
                      </div>
                      <div>
                        <Label htmlFor="authors">Author(s)</Label>
                        <Input
                          id="authors"
                          value={srsData.authors}
                          onChange={(e) => handleInputChange('authors', e.target.value)}
                          placeholder="e.g., John Doe, Jane Smith"
                        />
                      </div>
                      <div>
                        <Label htmlFor="affiliation">Affiliation</Label>
                        <Input
                          id="affiliation"
                          value={srsData.affiliation}
                          onChange={(e) => handleInputChange('affiliation', e.target.value)}
                          placeholder="e.g., ABC Software Solutions"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={srsData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="e.g., 123 Tech Street, City, State"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={srsData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="version">Document Version</Label>
                        <Input
                          id="version"
                          value={srsData.version}
                          onChange={(e) => handleInputChange('version', e.target.value)}
                          placeholder="e.g., 1.0"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="intro" className="space-y-4">
                    <div>
                      <Label htmlFor="purpose">Purpose of this Document</Label>
                      <Textarea
                        id="purpose"
                        value={srsData.purpose}
                        onChange={(e) => handleInputChange('purpose', e.target.value)}
                        placeholder="Explain the main aim and purpose of this document..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scope">Scope of this Document</Label>
                      <Textarea
                        id="scope"
                        value={srsData.scope}
                        onChange={(e) => handleInputChange('scope', e.target.value)}
                        placeholder="Describe the overall working, main objective, and value to customers..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="overview">Overview</Label>
                      <Textarea
                        id="overview"
                        value={srsData.overview}
                        onChange={(e) => handleInputChange('overview', e.target.value)}
                        placeholder="Provide a summary or overall review of the product..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="generalDescription">General Description</Label>
                      <Textarea
                        id="generalDescription"
                        value={srsData.generalDescription}
                        onChange={(e) => handleInputChange('generalDescription', e.target.value)}
                        placeholder="Describe general functions, user objectives, characteristics, features, and benefits..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="space-y-4">
                    <div>
                      <Label htmlFor="functionalRequirements">Functional Requirements</Label>
                      <Textarea
                        id="functionalRequirements"
                        value={srsData.functionalRequirements}
                        onChange={(e) => handleInputChange('functionalRequirements', e.target.value)}
                        placeholder="List all functional requirements including calculations, data processing, etc..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="interfaceRequirements">Interface Requirements</Label>
                      <Textarea
                        id="interfaceRequirements"
                        value={srsData.interfaceRequirements}
                        onChange={(e) => handleInputChange('interfaceRequirements', e.target.value)}
                        placeholder="Describe software interfaces, communication methods, APIs, etc..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="performanceRequirements">Performance Requirements</Label>
                      <Textarea
                        id="performanceRequirements"
                        value={srsData.performanceRequirements}
                        onChange={(e) => handleInputChange('performanceRequirements', e.target.value)}
                        placeholder="Specify performance criteria, response times, memory requirements, error rates..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="designConstraints">Design Constraints</Label>
                      <Textarea
                        id="designConstraints"
                        value={srsData.designConstraints}
                        onChange={(e) => handleInputChange('designConstraints', e.target.value)}
                        placeholder="List limitations, restrictions, algorithms, hardware/software constraints..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <Label htmlFor="nonFunctionalAttributes">Non-Functional Attributes</Label>
                      <Textarea
                        id="nonFunctionalAttributes"
                        value={srsData.nonFunctionalAttributes}
                        onChange={(e) => handleInputChange('nonFunctionalAttributes', e.target.value)}
                        placeholder="Describe security, portability, reliability, reusability, scalability requirements..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduleAndBudget">Preliminary Schedule and Budget</Label>
                      <Textarea
                        id="scheduleAndBudget"
                        value={srsData.scheduleAndBudget}
                        onChange={(e) => handleInputChange('scheduleAndBudget', e.target.value)}
                        placeholder="Provide project timeline, milestones, and budget estimates..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="appendices">Appendices</Label>
                      <Textarea
                        id="appendices"
                        value={srsData.appendices}
                        onChange={(e) => handleInputChange('appendices', e.target.value)}
                        placeholder="Include references, definitions, acronyms, abbreviations..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Actions and Preview Panel */}
          <div className="space-y-6">
            {/* Actions Card */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Save className="h-5 w-5 mr-2" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button 
                  onClick={exportDocument} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Document
                </Button>
                <Button
                  onClick={() => setPreviewOpen(true)}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Document
                </Button>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-orange-600 text-white rounded-t-lg">
                <CardTitle>Document Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {Object.entries(srsData).map(([key, value]) => {
                    const isCompleted = value.trim().length > 0;
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      </div>
                    );
                  })}
                </div>
                <Separator className="my-3" />
                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    Completion: {Math.round((Object.values(srsData).filter(v => v.trim().length > 0).length / Object.keys(srsData).length) * 100)}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines Card */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-purple-600 text-white rounded-t-lg">
                <CardTitle>SRS Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Be specific and clear in descriptions</li>
                  <li>• Use measurable requirements</li>
                  <li>• Include all stakeholder needs</li>
                  <li>• Maintain consistency throughout</li>
                  <li>• Review and validate with team</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Document Preview</DialogTitle>
              <DialogDescription>
                {srsData.title || 'SRS Document'} - v{srsData.version}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700">
                {generateDocumentContent()}
              </pre>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
