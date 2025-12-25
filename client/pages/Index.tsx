import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Save, Eye, FileJson, FileCode, Moon, Sun, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, PageBreak } from 'docx';

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

  const [activeSection, setActiveSection] = useState('introduction');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode was previously set
    const savedDarkMode = localStorage.getItem('srs-dark-mode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('srs-dark-mode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleInputChange = (field: keyof SRSData, value: string) => {
    setSrsData(prev => ({ ...prev, [field]: value }));
  };

  const exportAsMarkdown = () => {
    const content = `# SOFTWARE REQUIREMENT SPECIFICATION (SRS)

**Document Title:** ${srsData.title}
**Author(s):** ${srsData.authors}
**Affiliation:** ${srsData.affiliation}
**Address:** ${srsData.address}
**Date:** ${srsData.date}
**Document Version:** ${srsData.version}

---

## 1. INTRODUCTION

### 1.1 Purpose of this Document
${srsData.purpose}

### 1.2 Scope of this Document
${srsData.scope}

### 1.3 Overview
${srsData.overview}

---

## 2. GENERAL DESCRIPTION
${srsData.generalDescription}

---

## 3. FUNCTIONAL REQUIREMENTS
${srsData.functionalRequirements}

---

## 4. INTERFACE REQUIREMENTS
${srsData.interfaceRequirements}

---

## 5. PERFORMANCE REQUIREMENTS
${srsData.performanceRequirements}

---

## 6. DESIGN CONSTRAINTS
${srsData.designConstraints}

---

## 7. NON-FUNCTIONAL ATTRIBUTES
${srsData.nonFunctionalAttributes}

---

## 8. PRELIMINARY SCHEDULE AND BUDGET
${srsData.scheduleAndBudget}

---

## 9. APPENDICES
${srsData.appendices}

---
`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${srsData.title || 'SRS-Document'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExportDialogOpen(false);
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const textWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    const addText = (text: string, isBold = false, fontSize = 11) => {
      doc.setFontSize(fontSize);
      if (isBold) doc.setFont(undefined, 'bold');
      const lines = doc.splitTextToSize(text, textWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 2;
      if (isBold) doc.setFont(undefined, 'normal');

      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
    };

    // Header
    addText('SOFTWARE REQUIREMENT SPECIFICATION (SRS)', true, 14);
    yPosition += 3;
    addText(`Document Title: ${srsData.title}`);
    addText(`Author(s): ${srsData.authors}`);
    addText(`Affiliation: ${srsData.affiliation}`);
    addText(`Address: ${srsData.address}`);
    addText(`Date: ${srsData.date}`);
    addText(`Document Version: ${srsData.version}`);
    yPosition += 5;

    // Sections
    addText('1. INTRODUCTION', true, 12);
    addText('1.1 Purpose of this Document', true);
    addText(srsData.purpose);
    addText('1.2 Scope of this Document', true);
    addText(srsData.scope);
    addText('1.3 Overview', true);
    addText(srsData.overview);

    addText('2. GENERAL DESCRIPTION', true, 12);
    addText(srsData.generalDescription);

    addText('3. FUNCTIONAL REQUIREMENTS', true, 12);
    addText(srsData.functionalRequirements);

    addText('4. INTERFACE REQUIREMENTS', true, 12);
    addText(srsData.interfaceRequirements);

    addText('5. PERFORMANCE REQUIREMENTS', true, 12);
    addText(srsData.performanceRequirements);

    addText('6. DESIGN CONSTRAINTS', true, 12);
    addText(srsData.designConstraints);

    addText('7. NON-FUNCTIONAL ATTRIBUTES', true, 12);
    addText(srsData.nonFunctionalAttributes);

    addText('8. PRELIMINARY SCHEDULE AND BUDGET', true, 12);
    addText(srsData.scheduleAndBudget);

    addText('9. APPENDICES', true, 12);
    addText(srsData.appendices);

    doc.save(`${srsData.title || 'SRS-Document'}.pdf`);
    setExportDialogOpen(false);
  };

  const exportAsDOCX = async () => {
    const sections = [];

    sections.push(
      new Paragraph({
        text: 'SOFTWARE REQUIREMENT SPECIFICATION (SRS)',
        bold: true,
        size: 28,
      })
    );

    sections.push(
      new Paragraph({
        text: `Document Title: ${srsData.title}`,
        size: 22,
      })
    );

    sections.push(
      new Paragraph({
        text: `Author(s): ${srsData.authors}`,
        size: 22,
      })
    );

    sections.push(
      new Paragraph({
        text: `Affiliation: ${srsData.affiliation}`,
        size: 22,
      })
    );

    sections.push(
      new Paragraph({
        text: `Address: ${srsData.address}`,
        size: 22,
      })
    );

    sections.push(
      new Paragraph({
        text: `Date: ${srsData.date}`,
        size: 22,
      })
    );

    sections.push(
      new Paragraph({
        text: `Document Version: ${srsData.version}`,
        size: 22,
      })
    );

    sections.push(new Paragraph({ text: '' }));

    sections.push(
      new Paragraph({
        text: '1. INTRODUCTION',
        bold: true,
        size: 24,
      })
    );

    sections.push(
      new Paragraph({
        text: '1.1 Purpose of this Document',
        bold: true,
        size: 22,
      })
    );

    sections.push(new Paragraph(srsData.purpose || ''));
    sections.push(
      new Paragraph({
        text: '1.2 Scope of this Document',
        bold: true,
        size: 22,
      })
    );
    sections.push(new Paragraph(srsData.scope || ''));
    sections.push(
      new Paragraph({
        text: '1.3 Overview',
        bold: true,
        size: 22,
      })
    );
    sections.push(new Paragraph(srsData.overview || ''));

    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: '2. GENERAL DESCRIPTION',
        bold: true,
        size: 24,
      })
    );
    sections.push(new Paragraph(srsData.generalDescription || ''));

    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: '3. FUNCTIONAL REQUIREMENTS',
        bold: true,
        size: 24,
      })
    );
    sections.push(new Paragraph(srsData.functionalRequirements || ''));

    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: '4. INTERFACE REQUIREMENTS',
        bold: true,
        size: 24,
      })
    );
    sections.push(new Paragraph(srsData.interfaceRequirements || ''));

    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: '5. PERFORMANCE REQUIREMENTS',
        bold: true,
        size: 24,
      })
    );
    sections.push(new Paragraph(srsData.performanceRequirements || ''));

    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: '6. DESIGN CONSTRAINTS',
        bold: true,
        size: 24,
      })
    );
    sections.push(new Paragraph(srsData.designConstraints || ''));

    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: '7. NON-FUNCTIONAL ATTRIBUTES',
        bold: true,
        size: 24,
      })
    );
    sections.push(new Paragraph(srsData.nonFunctionalAttributes || ''));

    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: '8. PRELIMINARY SCHEDULE AND BUDGET',
        bold: true,
        size: 24,
      })
    );
    sections.push(new Paragraph(srsData.scheduleAndBudget || ''));

    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: '9. APPENDICES',
        bold: true,
        size: 24,
      })
    );
    sections.push(new Paragraph(srsData.appendices || ''));

    const doc = new Document({
      sections: [{ children: sections }],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${srsData.title || 'SRS-Document'}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportDialogOpen(false);
    });
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

  const sections = [
    { id: 'introduction', label: 'Introduction', icon: '📖' },
    { id: 'requirements', label: 'Requirements', icon: '✓' },
    { id: 'nonfunctional', label: 'Non-Functional', icon: '⚙️' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'appendices', label: 'Appendices', icon: '📎' },
  ];

  const getProgressPercentage = () => {
    const totalFields = Object.keys(srsData).length;
    const completedFields = Object.values(srsData).filter(v => v.trim().length > 0).length;
    return Math.round((completedFields / totalFields) * 100);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 border-b transition-colors duration-300 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">SRS Generator</h1>
          </div>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className={`rounded-lg p-6 h-fit transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'} shadow-sm`}>
            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Steps</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-900'
                      : isDarkMode
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span className="font-medium flex-1 text-left">{section.label}</span>
                  {activeSection === section.id && <ChevronRight className="h-4 w-4" />}
                </button>
              ))}
            </nav>

            {/* Progress Summary */}
            <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Overall Progress</span>
                <span className={`text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{getProgressPercentage()}%</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className={`shadow-lg border-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
              <CardHeader className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white rounded-t-lg`}>
                <CardTitle>Fill in Your Document Details</CardTitle>
                <CardDescription className={isDarkMode ? 'text-gray-300' : 'text-blue-100'}>
                  Complete each section to create your SRS document
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Header Section */}
                {(activeSection === 'introduction' || true) && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Document Header</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title" className={isDarkMode ? 'text-gray-300' : ''}>Document Title</Label>
                        <Input
                          id="title"
                          value={srsData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="e.g., E-Commerce Platform SRS"
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="authors" className={isDarkMode ? 'text-gray-300' : ''}>Author(s)</Label>
                        <Input
                          id="authors"
                          value={srsData.authors}
                          onChange={(e) => handleInputChange('authors', e.target.value)}
                          placeholder="e.g., John Doe, Jane Smith"
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="affiliation" className={isDarkMode ? 'text-gray-300' : ''}>Affiliation</Label>
                        <Input
                          id="affiliation"
                          value={srsData.affiliation}
                          onChange={(e) => handleInputChange('affiliation', e.target.value)}
                          placeholder="e.g., ABC Software Solutions"
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address" className={isDarkMode ? 'text-gray-300' : ''}>Address</Label>
                        <Input
                          id="address"
                          value={srsData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="e.g., 123 Tech Street, City, State"
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="date" className={isDarkMode ? 'text-gray-300' : ''}>Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={srsData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="version" className={isDarkMode ? 'text-gray-300' : ''}>Document Version</Label>
                        <Input
                          id="version"
                          value={srsData.version}
                          onChange={(e) => handleInputChange('version', e.target.value)}
                          placeholder="e.g., 1.0"
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Separator className={isDarkMode ? 'bg-gray-800' : ''} />

                {/* Introduction Section */}
                {(activeSection === 'introduction' || true) && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Introduction</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="purpose" className={isDarkMode ? 'text-gray-300' : ''}>Purpose of this Document</Label>
                        <Textarea
                          id="purpose"
                          value={srsData.purpose}
                          onChange={(e) => handleInputChange('purpose', e.target.value)}
                          placeholder="Explain the main aim and purpose of this document..."
                          rows={3}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="scope" className={isDarkMode ? 'text-gray-300' : ''}>Scope of this Document</Label>
                        <Textarea
                          id="scope"
                          value={srsData.scope}
                          onChange={(e) => handleInputChange('scope', e.target.value)}
                          placeholder="Describe the overall working, main objective, and value to customers..."
                          rows={3}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="overview" className={isDarkMode ? 'text-gray-300' : ''}>Overview</Label>
                        <Textarea
                          id="overview"
                          value={srsData.overview}
                          onChange={(e) => handleInputChange('overview', e.target.value)}
                          placeholder="Provide a summary or overall review of the product..."
                          rows={3}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="generalDescription" className={isDarkMode ? 'text-gray-300' : ''}>General Description</Label>
                        <Textarea
                          id="generalDescription"
                          value={srsData.generalDescription}
                          onChange={(e) => handleInputChange('generalDescription', e.target.value)}
                          placeholder="Describe general functions, user objectives, characteristics, features, and benefits..."
                          rows={3}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Separator className={isDarkMode ? 'bg-gray-800' : ''} />

                {/* Requirements Section */}
                {(activeSection === 'requirements' || true) && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Requirements</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="functionalRequirements" className={isDarkMode ? 'text-gray-300' : ''}>Functional Requirements</Label>
                        <Textarea
                          id="functionalRequirements"
                          value={srsData.functionalRequirements}
                          onChange={(e) => handleInputChange('functionalRequirements', e.target.value)}
                          placeholder="List all functional requirements including calculations, data processing, etc..."
                          rows={3}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="interfaceRequirements" className={isDarkMode ? 'text-gray-300' : ''}>Interface Requirements</Label>
                        <Textarea
                          id="interfaceRequirements"
                          value={srsData.interfaceRequirements}
                          onChange={(e) => handleInputChange('interfaceRequirements', e.target.value)}
                          placeholder="Describe software interfaces, communication methods, APIs, etc..."
                          rows={3}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="performanceRequirements" className={isDarkMode ? 'text-gray-300' : ''}>Performance Requirements</Label>
                        <Textarea
                          id="performanceRequirements"
                          value={srsData.performanceRequirements}
                          onChange={(e) => handleInputChange('performanceRequirements', e.target.value)}
                          placeholder="Specify performance criteria, response times, memory requirements, error rates..."
                          rows={3}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="designConstraints" className={isDarkMode ? 'text-gray-300' : ''}>Design Constraints</Label>
                        <Textarea
                          id="designConstraints"
                          value={srsData.designConstraints}
                          onChange={(e) => handleInputChange('designConstraints', e.target.value)}
                          placeholder="List limitations, restrictions, algorithms, hardware/software constraints..."
                          rows={3}
                          className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Separator className={isDarkMode ? 'bg-gray-800' : ''} />

                {/* Non-Functional Section */}
                {(activeSection === 'nonfunctional' || true) && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Non-Functional Attributes</h3>
                    <div>
                      <Label htmlFor="nonFunctionalAttributes" className={isDarkMode ? 'text-gray-300' : ''}>Non-Functional Attributes</Label>
                      <Textarea
                        id="nonFunctionalAttributes"
                        value={srsData.nonFunctionalAttributes}
                        onChange={(e) => handleInputChange('nonFunctionalAttributes', e.target.value)}
                        placeholder="Describe security, portability, reliability, reusability, scalability requirements..."
                        rows={4}
                        className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                      />
                    </div>
                  </div>
                )}

                <Separator className={isDarkMode ? 'bg-gray-800' : ''} />

                {/* Schedule Section */}
                {(activeSection === 'schedule' || true) && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Schedule & Budget</h3>
                    <div>
                      <Label htmlFor="scheduleAndBudget" className={isDarkMode ? 'text-gray-300' : ''}>Preliminary Schedule and Budget</Label>
                      <Textarea
                        id="scheduleAndBudget"
                        value={srsData.scheduleAndBudget}
                        onChange={(e) => handleInputChange('scheduleAndBudget', e.target.value)}
                        placeholder="Provide project timeline, milestones, and budget estimates..."
                        rows={4}
                        className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                      />
                    </div>
                  </div>
                )}

                <Separator className={isDarkMode ? 'bg-gray-800' : ''} />

                {/* Appendices Section */}
                {(activeSection === 'appendices' || true) && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Appendices</h3>
                    <div>
                      <Label htmlFor="appendices" className={isDarkMode ? 'text-gray-300' : ''}>Appendices</Label>
                      <Textarea
                        id="appendices"
                        value={srsData.appendices}
                        onChange={(e) => handleInputChange('appendices', e.target.value)}
                        placeholder="Include references, definitions, acronyms, abbreviations..."
                        rows={4}
                        className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Live Preview + Actions */}
          <div className="lg:col-span-1 space-y-4">
            {/* Actions Card */}
            <Card className={`shadow-lg border-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
              <CardHeader className={`${isDarkMode ? 'bg-green-700' : 'bg-green-600'} text-white rounded-t-lg`}>
                <CardTitle className="flex items-center">
                  <Save className="h-5 w-5 mr-2" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button
                  onClick={() => setExportDialogOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={() => setPreviewOpen(true)}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card className={`shadow-lg border-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
              <CardHeader className={`${isDarkMode ? 'bg-purple-700' : 'bg-purple-600'} text-white rounded-t-lg`}>
                <CardTitle className="text-sm">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ScrollArea className={`h-96 rounded-md ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border'} p-3`}>
                  <div className={`text-xs font-mono space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div><span className="font-bold">Title:</span> {srsData.title || '(Not filled)'}</div>
                    <div><span className="font-bold">Authors:</span> {srsData.authors || '(Not filled)'}</div>
                    <div><span className="font-bold">Affiliation:</span> {srsData.affiliation || '(Not filled)'}</div>
                    <div><span className="font-bold">Date:</span> {srsData.date}</div>
                    <div><span className="font-bold">Version:</span> {srsData.version}</div>
                    {srsData.purpose && <div className="mt-3"><span className="font-bold">Purpose:</span> {srsData.purpose.substring(0, 100)}...</div>}
                    {srsData.scope && <div><span className="font-bold">Scope:</span> {srsData.scope.substring(0, 100)}...</div>}
                    {srsData.functionalRequirements && <div><span className="font-bold">Functional Req:</span> {srsData.functionalRequirements.substring(0, 100)}...</div>}
                    <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <span className="font-bold">Completion:</span> {getProgressPercentage()}%
                    </div>
                  </div>
                </ScrollArea>
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

        {/* Export Format Dialog */}
        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Export Document</DialogTitle>
              <DialogDescription>
                Choose the format you want to export your SRS document as
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                onClick={exportAsPDF}
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
              >
                <FileText className="h-6 w-6 text-red-600" />
                <span className="font-semibold">PDF</span>
                <span className="text-xs text-gray-500">Professional format, best for sharing</span>
              </Button>
              <Button
                onClick={exportAsDOCX}
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
              >
                <FileJson className="h-6 w-6 text-blue-600" />
                <span className="font-semibold">DOCX</span>
                <span className="text-xs text-gray-500">Editable in Microsoft Word</span>
              </Button>
              <Button
                onClick={exportAsMarkdown}
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
              >
                <FileCode className="h-6 w-6 text-gray-600" />
                <span className="font-semibold">Markdown</span>
                <span className="text-xs text-gray-500">Lightweight, version control friendly</span>
              </Button>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setExportDialogOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
