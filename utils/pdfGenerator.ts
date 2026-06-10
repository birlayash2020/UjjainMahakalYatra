import { jsPDF } from "jspdf";
import { Package, ItineraryItem } from "../data/yatras";

export function generatePackageItineraryPDF(pkg: Package, itinerary: ItineraryItem[]) {
  // Create a new PDF document (A4, portrait, mm coordinates)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Theme Colors matching the web styling
  const primaryColor = [224, 86, 36]; // #E05624 (Saffron/Bhagwa)
  const secondaryColor = [44, 37, 32]; // #2C2520 (Charcoal Earth)
  const grayColor = [110, 110, 110];
  const lightBgColor = [253, 251, 247]; // #FDFBF7 (Sacred Cream)
  const borderOrangeColor = [245, 230, 210];

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = 20;

  // Helper: Header and Footer decoration
  const drawHeaderFooter = () => {
    // Top header banner thin line
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 4, "F");

    // Bottom footer text
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("© www.ujjainmahakalyatra.com | Helpline: +91 90099 66566", margin, pageHeight - 10);
    
    const pageNum = doc.getNumberOfPages();
    doc.text(`Page ${pageNum}`, pageWidth - margin - 10, pageHeight - 10);
  };

  // Helper: Dynamic page overflow handler
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawHeaderFooter();
    }
  };

  // Initial decoration
  drawHeaderFooter();

  // 1. Header (Brand Title)
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("OMKARESHWAR YATRA", margin, y);
  y += 7;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.text("Assisted Vedic Pujas, VIP Temple Entry & Premium Transit", margin, y);
  
  // Line separator
  y += 4;
  doc.setDrawColor(235, 235, 235);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // 2. Package Banner Card
  doc.setFillColor(lightBgColor[0], lightBgColor[1], lightBgColor[2]);
  doc.setDrawColor(borderOrangeColor[0], borderOrangeColor[1], borderOrangeColor[2]);
  doc.rect(margin, y, pageWidth - 2 * margin, 35, "FD");

  // Package Details
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(pkg.title, margin + 6, y + 8);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 50);
  doc.text(`🕒 Duration: ${pkg.duration}`, margin + 6, y + 16);
  doc.text(`★ Rating: ${pkg.rating}.0 / 5.0 Rating`, margin + 6, y + 22);

  doc.setFont("Helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`Price: ${pkg.price} / Per Person`, margin + 6, y + 28);
  y += 44;

  // 3. Overview Text
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Yatra Overview", margin, y);
  y += 5;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  const overview = "Join us on a sacred tour designed to give you a deep spiritual experience of the holy shrines of Madhya Pradesh. We manage all registrations, VIP entry passes, puja preparation, and hotels so you can pray in peace. Suitable for families, senior citizens, and group pilgrims.";
  const splitOverview = doc.splitTextToSize(overview, pageWidth - 2 * margin);
  doc.text(splitOverview, margin, y);
  y += (splitOverview.length * 5) + 8;

  // 4. Inclusions (What's Included)
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("What is Included:", margin, y);
  y += 6;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  pkg.features.forEach((feature) => {
    checkPageBreak(7);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("✓", margin, y);
    doc.setTextColor(60, 60, 60);
    doc.text(feature, margin + 5, y);
    y += 6;
  });

  // Default inclusions
  checkPageBreak(7);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("✓", margin, y);
  doc.setTextColor(60, 60, 60);
  doc.text("24/7 Helpline Assistance & assisted Vedic Puja coordination", margin + 5, y);
  y += 6;

  checkPageBreak(7);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("✓", margin, y);
  doc.setTextColor(60, 60, 60);
  doc.text("All toll taxes, parking, and driver charges included", margin + 5, y);
  y += 12;

  // 5. Day-by-Day Itinerary Header
  checkPageBreak(12);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Detailed Day-by-Day Itinerary:", margin, y);
  y += 8;

  // Loop through the itinerary and render each day nicely
  itinerary.forEach((item) => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10.5);
    const splitDayTitle = doc.splitTextToSize(item.day, pageWidth - 2 * margin - 10);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    const splitDetails = doc.splitTextToSize(item.details, pageWidth - 2 * margin - 10);

    const neededHeight = (splitDayTitle.length * 5.5) + (splitDetails.length * 5) + 10;
    checkPageBreak(neededHeight);

    // Bullet Point
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(margin + 2, y + 1.5, 1.2, "F");

    // Render Day Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(splitDayTitle, margin + 7, y + 2);
    y += (splitDayTitle.length * 5.5);

    // Render Details
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    doc.text(splitDetails, margin + 7, y + 1.5);
    y += (splitDetails.length * 5) + 7;
  });

  // Save PDF file
  const formattedTitle = pkg.title.toLowerCase().replace(/[^a-z0-9]/g, "_");
  doc.save(`yatra_itinerary_${formattedTitle}.pdf`);
}
