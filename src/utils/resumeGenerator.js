import jsPDF from 'jspdf';
import aboutData from '../data/about.json';
import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';
import achievementsData from '../data/achievements.json';

export const generateResume = () => {
  const pdf = new jsPDF();
  
  // Set font
  pdf.setFont('helvetica');
  
  let yPosition = 20;
  
  // Header
  pdf.setFontSize(24);
  pdf.setTextColor(14, 165, 233); // Primary color
  pdf.text(aboutData.name, 105, yPosition, { align: 'center' });
  
  yPosition += 8;
  pdf.setFontSize(12);
  pdf.setTextColor(100, 100, 100);
  pdf.text(aboutData.title, 105, yPosition, { align: 'center' });
  
  yPosition += 6;
  pdf.setFontSize(10);
  pdf.text(aboutData.tagline, 105, yPosition, { align: 'center' });
  
  // Contact Info
  yPosition += 10;
  pdf.setTextColor(60, 60, 60);
  const contactInfo = `${aboutData.email} | ${aboutData.phone} | ${aboutData.location}`;
  pdf.text(contactInfo, 105, yPosition, { align: 'center' });
  
  // Line separator
  yPosition += 5;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(20, yPosition, 190, yPosition);
  
  // About Section
  yPosition += 10;
  pdf.setFontSize(14);
  pdf.setTextColor(14, 165, 233);
  pdf.text('ABOUT', 20, yPosition);
  
  yPosition += 8;
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  const bioLines = pdf.splitTextToSize(aboutData.bio, 170);
  pdf.text(bioLines, 20, yPosition);
  yPosition += bioLines.length * 5 + 5;
  
  // Skills Section
  pdf.setFontSize(14);
  pdf.setTextColor(14, 165, 233);
  pdf.text('SKILLS', 20, yPosition);
  yPosition += 8;
  
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  
  Object.keys(skillsData.categories).forEach((category) => {
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(category + ':', 20, yPosition);
    pdf.setFont('helvetica', 'normal');
    
    const skills = skillsData.categories[category].map(s => s.name).join(', ');
    const skillLines = pdf.splitTextToSize(skills, 150);
    pdf.text(skillLines, 50, yPosition);
    yPosition += skillLines.length * 5 + 3;
  });
  
  // Projects Section
  yPosition += 5;
  if (yPosition > 250) {
    pdf.addPage();
    yPosition = 20;
  }
  
  pdf.setFontSize(14);
  pdf.setTextColor(14, 165, 233);
  pdf.text('FEATURED PROJECTS', 20, yPosition);
  yPosition += 8;
  
  const featuredProjects = projectsData.filter(p => p.featured).slice(0, 3);
  
  featuredProjects.forEach((project, index) => {
    if (yPosition > 260) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${project.title}`, 20, yPosition);
    
    yPosition += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    const descLines = pdf.splitTextToSize(project.description, 170);
    pdf.text(descLines, 20, yPosition);
    yPosition += descLines.length * 4 + 2;
    
    pdf.setTextColor(100, 100, 100);
    pdf.text('Tech: ' + project.techStack.join(', '), 20, yPosition);
    yPosition += 7;
  });
  
  // Achievements Section
  if (yPosition > 240) {
    pdf.addPage();
    yPosition = 20;
  }
  
  pdf.setFontSize(14);
  pdf.setTextColor(14, 165, 233);
  pdf.text('CERTIFICATIONS', 20, yPosition);
  yPosition += 8;
  
  achievementsData.slice(0, 4).forEach((cert) => {
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    pdf.setFont('helvetica', 'bold');
    pdf.text(cert.title, 20, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    yPosition += 4;
    pdf.text(`${cert.issuer} | ${cert.date}`, 20, yPosition);
    yPosition += 7;
  });
  
  // Footer
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Generated from ${aboutData.name}'s Portfolio | Page ${i} of ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
  }
  
  // Save the PDF
  pdf.save(`${aboutData.name}_Resume.pdf`);
};
