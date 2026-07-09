import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'pdfs');
mkdirSync(outDir, { recursive: true });

const BRAND_COLOR = rgb(0.2, 0.5, 0.9); // primary-500 approximation
const DARK = rgb(0.1, 0.1, 0.1);
const GRAY = rgb(0.4, 0.4, 0.4);
const LIGHT_BG = rgb(0.97, 0.97, 0.98);

async function buildPdf(title, sections) {
  const doc = await PDFDocument.create();
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);

  const addPage = () => {
    const page = doc.addPage([612, 792]); // letter
    // Header bar
    page.drawRectangle({ x: 0, y: 752, width: 612, height: 40, color: BRAND_COLOR });
    // Company name in header
    page.drawText('Ride & Slide Party Co.', {
      x: 24, y: 762, size: 13, font: helveticaBold, color: rgb(1, 1, 1),
    });
    // Footer line
    page.drawLine({ start: { x: 24, y: 36 }, end: { x: 588, y: 36 }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
    page.drawText('© Ride & Slide Party Co. — For event use only. Keep this document accessible during your rental.', {
      x: 24, y: 20, size: 7.5, font: helvetica, color: GRAY,
    });
    return page;
  };

  let page = addPage();
  let y = 720;

  // Title
  page.drawText(title, { x: 24, y, size: 22, font: helveticaBold, color: DARK });
  y -= 10;
  page.drawLine({ start: { x: 24, y }, end: { x: 588, y }, thickness: 2, color: BRAND_COLOR });
  y -= 28;

  for (const section of sections) {
    if (y < 100) { page = addPage(); y = 710; }

    // Section heading
    page.drawRectangle({ x: 24, y: y - 4, width: 564, height: 22, color: LIGHT_BG });
    page.drawText(section.heading, { x: 28, y, size: 12, font: helveticaBold, color: BRAND_COLOR });
    y -= 26;

    // Body lines
    for (const line of section.lines) {
      if (y < 80) { page = addPage(); y = 710; }
      const isItem = line.startsWith('• ');
      page.drawText(line, {
        x: isItem ? 36 : 28,
        y,
        size: 10,
        font: isItem ? helvetica : helveticaBold,
        color: isItem ? DARK : GRAY,
        maxWidth: 550,
      });
      y -= 16;
    }
    y -= 14;
  }

  return doc.save();
}

// ─── PDF 1: Bounce House Supervision ────────────────────────────────────────
const bounceHousePdf = await buildPdf('How to Supervise a Bounce House', [
  {
    heading: 'Before Use — Setup Checklist',
    lines: [
      '• Ensure the unit is fully inflated and all seams are sealed before allowing entry.',
      '• Verify anchor stakes or sandbags are secure at all four corners.',
      '• Inspect the blower motor — do not operate if the motor makes unusual sounds.',
      '• Clear a 6-foot safety perimeter around all sides of the unit.',
      '• Keep the entrance/exit clear of obstacles at all times.',
    ],
  },
  {
    heading: 'During Use — Supervision Rules',
    lines: [
      '• A responsible adult supervisor must be present and actively watching at ALL times.',
      '• Maximum occupancy: follow the posted limit on the unit label (typically 4–6 children).',
      '• No shoes, sharp objects, jewelry, or eyeglasses inside the bounce house.',
      '• No food, drinks, gum, or silly string allowed inside the unit.',
      '• Keep children of similar size and age together — do not mix toddlers with older kids.',
      '• Prohibit flips, wrestling, or roughhousing.',
      '• One person at a time on the slide attachment, if applicable.',
    ],
  },
  {
    heading: 'Weather Policy',
    lines: [
      '• Immediately evacuate and power off the unit if winds exceed 15 mph.',
      '• Do not operate in rain, lightning, or thunderstorm conditions.',
      '• In high heat (above 95 °F), take frequent shade and water breaks.',
    ],
  },
  {
    heading: 'Emergency Procedures',
    lines: [
      '• If the blower fails, calmly guide all children out immediately.',
      '• In case of injury, call 911 first, then contact Ride & Slide Party Co.',
      '• Do not attempt to move or deflate the unit without contacting us first.',
    ],
  },
]);

writeFileSync(join(outDir, 'bounce-house-supervision.pdf'), bounceHousePdf);
console.log('✓ bounce-house-supervision.pdf');

// ─── PDF 2: Mechanical Bull Rider Rules ─────────────────────────────────────
const bullPdf = await buildPdf('Mechanical Bull Rider Rules', [
  {
    heading: 'Eligibility Requirements',
    lines: [
      '• Riders must be at least 7 years old.',
      '• Minimum weight: 40 lbs. Maximum weight: 250 lbs.',
      '• Riders must sign (or have a guardian sign) the liability waiver before riding.',
      '• Pregnant individuals, those with back/neck injuries, or recent surgery must NOT ride.',
      '• Individuals under the influence of alcohol or substances are strictly prohibited.',
    ],
  },
  {
    heading: 'Before the Ride',
    lines: [
      '• Remove all jewelry, belts, and items from pockets.',
      '• Wear closed-toe shoes — no sandals, flip-flops, or bare feet.',
      '• Secure loose clothing. Long hair should be tied back.',
      '• Sit centered on the saddle and grip the handle with your dominant hand.',
    ],
  },
  {
    heading: 'During the Ride',
    lines: [
      '• One rider at a time — no spectators on the mat while the bull is in motion.',
      '• The operator controls the speed — do not request dangerous or extreme speeds for children.',
      '• If you feel unsafe, raise your free hand and the operator will stop immediately.',
      '• Lean back slightly to maintain balance; do not lean too far forward.',
    ],
  },
  {
    heading: 'Operator Responsibilities',
    lines: [
      '• Keep the remote control within reach at all times.',
      '• Start at the lowest speed setting for all new riders.',
      '• Actively watch every rider and stop the machine if the rider appears to lose control.',
      '• No one may be on the mat within 3 feet of the bull while it is operating.',
      '• Inspect the mat before each use — ensure it is fully inflated and positioned correctly.',
    ],
  },
  {
    heading: 'After Each Ride',
    lines: [
      '• Allow the rider to dismount before the next rider approaches.',
      '• Wipe down the saddle handle with the provided sanitizer wipe between riders.',
    ],
  },
]);

writeFileSync(join(outDir, 'mechanical-bull-rider-rules.pdf'), bullPdf);
console.log('✓ mechanical-bull-rider-rules.pdf');

// ─── PDF 3: Generator Safety Guidelines ─────────────────────────────────────
const generatorPdf = await buildPdf('Generator Safety Guidelines', [
  {
    heading: 'Placement & Location',
    lines: [
      '• Always operate the generator OUTDOORS — never inside a building, garage, or tent.',
      '• Position the generator at least 20 feet away from doors, windows, and vents.',
      '• Keep the exhaust pointed away from the event area and any occupied spaces.',
      '• Place on a flat, dry, stable surface. Do not operate on wet ground.',
      '• Never place a generator under a canopy or tarp — it must have full open-air ventilation.',
    ],
  },
  {
    heading: 'Carbon Monoxide (CO) Hazard — Critical Warning',
    lines: [
      '• Generators produce CO gas, which is odorless, colorless, and can be fatal.',
      '• Install battery-operated CO detectors in nearby enclosed spaces.',
      '• If anyone feels dizzy, nauseous, or has a headache near the generator, move to fresh air immediately and call 911.',
      '• Never run a generator indoors for any reason — even briefly.',
    ],
  },
  {
    heading: 'Fueling Safety',
    lines: [
      '• Use only fresh, clean unleaded gasoline.',
      '• NEVER add fuel while the generator is running or hot — allow it to cool for 2 minutes.',
      '• Store fuel in an approved container, away from the generator and heat sources.',
      '• Do not overfill the fuel tank — leave room for fuel expansion.',
      '• Wipe up any spills immediately before starting the engine.',
    ],
  },
  {
    heading: 'Electrical Safety',
    lines: [
      '• Use only heavy-duty, outdoor-rated extension cords rated for the wattage load.',
      '• Do not overload the generator — check the total wattage of all connected devices.',
      '• Keep the generator dry. Never operate in rain without a proper generator tent/cover.',
      '• Do not connect a generator directly to home wiring (back-feeding) — this is illegal and dangerous.',
      '• Plug blower motors directly into the generator; avoid daisy-chaining power strips.',
    ],
  },
  {
    heading: 'Shutdown Procedure',
    lines: [
      '• Turn off and unplug all connected equipment before shutting down the generator.',
      '• Allow the generator to cool completely before covering or storing.',
      '• If storing for more than 30 days, run the carburetor dry or use fuel stabilizer.',
    ],
  },
]);

writeFileSync(join(outDir, 'generator-safety-guidelines.pdf'), generatorPdf);
console.log('✓ generator-safety-guidelines.pdf');

console.log('\nAll PDFs written to public/pdfs/');
