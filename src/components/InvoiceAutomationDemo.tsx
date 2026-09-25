import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Check, Mail, Play, RotateCcw, Send, SkipForward } from 'lucide-react';

const stages = ['Gmail Trigger', 'Get Email', 'Attachment Processing', 'File Type Check', 'PDF Conversion', 'AI Document Extraction', 'Invoice Validation', 'Duplicate Invoice Check', 'Total Mismatch Check', 'Google Sheets', 'Notifications'];
const validationChecks = ['Required fields detected', 'Invoice number valid', 'Line items detected', 'Calculated total = ₦26,000', 'Invoice total = ₦26,000', 'Total matches'];

function Notice({ title, children, tone = '' }: { title: string; children: React.ReactNode; tone?: string }) {
  return <article className={`invoice-notice ${tone}`}><small>{title} <span>SIMULATED</span></small>{children}</article>;
}

export default function InvoiceAutomationDemo() {
  const [step, setStep] = useState(-1);
  const [complete, setComplete] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const started = step >= 0;
  const start = () => { window.clearTimeout(timer.current); setComplete(false); setInitializing(true); window.setTimeout(() => { setStep(0); setInitializing(false); }, 180); };
  const skip = () => { window.clearTimeout(timer.current); setStep(stages.length - 1); setComplete(true); };
  useEffect(() => {
    if (step < 0 || complete) return;
    if (step === stages.length - 1) { timer.current = window.setTimeout(() => setComplete(true), 1100); return () => window.clearTimeout(timer.current); }
    timer.current = window.setTimeout(() => setStep(current => current + 1), 1050);
    return () => window.clearTimeout(timer.current);
  }, [step, complete]);
  const visible = (index: number) => complete || step >= index;

  return <section id="invoice-demo" className="invoice-demo" aria-labelledby="invoice-demo-title">
    <div className="invoice-demo-heading"><p className="eyebrow">INTERACTIVE SYSTEM DEMO</p><h2 id="invoice-demo-title">See the Automation in Action</h2><p>Watch a simulated invoice move through an automated AI-powered processing, validation, payment reminder, and reporting system.</p><small>Interactive demonstration — simulated for portfolio presentation.</small></div>
    <div className="demo-controls">
      <button className="button primary" onClick={start} disabled={initializing}><Play />{initializing ? 'Initializing simulation…' : complete ? 'Run Demo Again' : started ? 'Restart Simulation' : 'Start Simulation'}</button>
      <button className="button" onClick={skip}><SkipForward />Skip Animation</button>
    </div>

    <div className={`automation-canvas ${started ? 'is-running' : ''}`}>
      <div className="email-arrival"><Notice title="GMAIL"><h3>New invoice received</h3><p><b>From:</b> Sunrise Electronics<br/><b>Subject:</b> Invoice INV-3003<br/><b>Attachment:</b> Invoice_INV-3003.docx</p></Notice><div className="arrival-route"><span>New Email</span><ArrowDown/><span>Invoice Detected</span><ArrowDown/><strong>Automation Started</strong></div></div>
      <div className="workflow-track" aria-label="Simulated invoice processing workflow">
        {stages.map((name, index) => <div className="workflow-item" key={name}>
          <article className={`workflow-node ${step === index && !complete ? 'active' : ''} ${visible(index) && step !== index ? 'done' : ''}`}><span className="node-index">{visible(index) && step !== index ? <Check /> : String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><small>{step === index && !complete ? 'Processing…' : visible(index) ? 'Completed' : 'Queued'}</small></article>{index < stages.length - 1 && <i className={visible(index) ? 'flowing' : ''} aria-hidden="true"/>}</div>)}
      </div>
      {visible(3) && <div className="demo-detail conversion"><div><small>FILE TYPE CHECK</small><strong>Document type detected: DOCX</strong><p>PDF conversion required</p></div><div className={step === 4 && !complete ? 'conversion-progress loading' : 'conversion-progress'}><b>CloudConvert <span>SIMULATED</span></b><p>{step === 4 && !complete ? 'Converting document…' : '✓ PDF generated'}</p><meter min="0" max="100" value={step === 4 && !complete ? 80 : 100}>80%</meter><small>Invoice_INV-3003.pdf</small></div></div>}
      {visible(5) && <div className="demo-detail extraction"><Notice title="ANTHROPIC CLAUDE"><h3>Simulated AI Document Extraction</h3><div className="invoice-fields"><span>Invoice Number <b>INV-3003</b></span><span>Vendor <b>Sunrise Electronics</b></span><span>Date <b>September 23, 2026</b></span><span>Items <b>Wireless Mouse — ₦8,000<br/>Keyboard — ₦15,000<br/>HDMI Cable — ₦3,000</b></span><span>Total <b>₦26,000</b></span></div></Notice></div>}
      {visible(6) && <div className="demo-detail validation"><h3>Invoice Validation</h3>{validationChecks.map((check, index) => <p className={step === 6 && !complete && index > 2 ? 'pending' : ''} key={check}><Check /> {check}</p>)}</div>}
      {visible(7) && <div className="demo-detail checks"><div><small>GOOGLE SHEETS · SIMULATED LOOKUP</small><h3>Checking existing invoice records…</h3><p>Searching invoice number: <b>INV-3003</b></p><strong><Check /> No duplicate invoice detected</strong></div><div><small>DETERMINISTIC VALIDATION RULE</small><h3>Checking invoice total</h3><p>Calculated total: <b>₦26,000</b><br/>Invoice total: <b>₦26,000</b></p><strong><Check /> No total mismatch detected</strong></div></div>}
      {visible(9) && <div className="demo-detail logging"><small>GOOGLE SHEETS · SIMULATED</small><div className="sheet"><div>Invoice</div><div>Vendor</div><div>Date</div><div>Total</div><div>Status</div><div>INV-3003</div><div>Sunrise Electronics</div><div>23/09/2026</div><div>₦26,000</div><div>Pending</div></div><strong><Check /> Invoice successfully logged</strong></div>}
      {visible(10) && <div className="notification-grid"><Notice title="TELEGRAM BOT"><h3>✓ Invoice successfully logged</h3><p>Invoice: <b>INV-3003</b><br/>Vendor: <b>Sunrise Electronics</b><br/>Total: <b>₦26,000</b><br/>Status: <b>Pending</b></p></Notice><Notice title="EMAIL SENT"><h3>Invoice INV-3003 Successfully Processed</h3><p>Invoice INV-3003 has been validated and logged successfully.</p></Notice></div>}
    </div>

    {complete && <div className="secondary-automations">
      <section><p className="eyebrow">SECOND AUTOMATION</p><h2>Automated Payment Reminder</h2><p>This automation runs every day at 9:00 AM and checks invoice payment status.</p><div className="reminder-flow"><strong>DAILY SCHEDULE<br/><b>09:00 AM</b></strong><ArrowDown/><span>Google Sheets<br/>Check pending invoices</span><ArrowDown/><span>Check how long each invoice has remained pending</span></div><div className="days"><span>DAY 1</span><span>DAY 2</span><span>DAY 3</span><span>DAY 4</span><span>DAY 5</span><span>DAY 6</span><span className="trigger">DAY 7</span><span className="trigger">DAY 8<br/><b>REMINDER TRIGGERED</b></span></div><div className="rule-card"><p><b>Invoice:</b> INV-3003 · <b>Status:</b> Pending · <b>Days Pending:</b> 8</p><p>Pending for less than 7 days → No reminder<br/>Pending for 7+ days → Reminder triggered</p><strong>⚠ Payment reminder triggered</strong></div><div className="notification-grid"><Notice title="TELEGRAM BOT" tone="warning"><h3>⚠ Payment Reminder</h3><p>Invoice: INV-3003<br/>Vendor: Sunrise Electronics<br/>Status: Pending for 8 days<br/><b>Reminder sent.</b></p></Notice><Notice title="EMAIL SENT" tone="warning"><h3>Payment Reminder — INV-3003</h3><p>Invoice INV-3003 has remained pending for 8 days.<br/><br/>Please follow up on the outstanding payment.</p></Notice></div></section>
      <section><p className="eyebrow">THIRD AUTOMATION</p><h2>Monthly Invoice Summary</h2><p>This automation runs automatically on the first day of each month at 9:00 AM.</p><div className="monthly-flow"><strong>OCTOBER 1<br/><b>09:00 AM</b></strong><ArrowDown/><span>Monthly automation triggered</span><ArrowDown/><span>Google Sheets · Retrieve previous month's invoices · Calculate monthly totals</span><ArrowDown/><strong>✓ Monthly invoice summary generated</strong></div><div className="summary-card"><small>SEPTEMBER 2026</small><p>Total invoices: <b>24</b></p><p>Total invoice value: <b>₦4,860,000</b></p><p>Paid: <b>₦3,420,000</b></p><p>Pending: <b>₦1,440,000</b></p></div><div className="notification-grid"><Notice title="TELEGRAM BOT"><h3>📊 Monthly Invoice Summary</h3><p>September 2026<br/>Total invoices: 24<br/>Total invoice value: ₦4,860,000<br/>Paid: ₦3,420,000<br/>Pending: ₦1,440,000<br/><b>✓ Monthly report generated</b></p></Notice><Notice title="EMAIL SENT"><h3>September 2026 Invoice Summary</h3><p>Total invoices: 24<br/>Total invoice value: ₦4,860,000<br/>Paid: ₦3,420,000<br/>Pending: ₦1,440,000</p></Notice></div></section>
      <section className="system-overview"><p className="eyebrow">COMPLETE OVERVIEW</p><h2>Invoice Automation System</h2><div><article><h3>Invoice Processing</h3><p>Gmail<br/>AI Extract<br/>Validation<br/>Duplicate<br/>Mismatch<br/>Sheets<br/>Telegram</p></article><article><h3>Payment Reminders</h3><p>Daily 9 AM<br/>7+ Days Pending<br/>Reminder<br/>Telegram<br/>Email</p></article><article><h3>Monthly Reporting</h3><p>1st of Month<br/>9 AM<br/>Previous Month Total<br/>Summary<br/>Telegram<br/>Email</p></article></div></section>
      <button className="button primary" onClick={start}><RotateCcw />Run Demo Again</button>
    </div>}
  </section>;
}
