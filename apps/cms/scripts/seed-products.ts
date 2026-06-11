/**
 * Seed script for Products (Logix, Proxmox).
 * Run: STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=xxx npx ts-node scripts/seed-products.ts
 * Creates the Thai (default-locale) entry first, then the English localization.
 */
export {};

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface Loc {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  intro: string;
  ctaLabel: string;
  heroChips?: string[];
  features: { icon: string; title: string; body: string }[];
  tiers?: { name: string; tagline: string; featured?: boolean; points: string[] }[];
  addOns?: { icon: string; title: string; body: string; features: string[] }[];
  extra?: Record<string, unknown>;
}

interface ProductSeed {
  name: string;
  slug: string;
  kind: 'proxmox' | 'logix';
  order: number;
  th: Loc;
  en: Loc;
}

const products: ProductSeed[] = [
  {
    name: 'Logix',
    slug: 'logix',
    kind: 'logix',
    order: 1,
    en: {
      eyebrow: 'Product · Logix',
      title: 'Your Sovereign AI Platform',
      intro: 'Logix is sovereign agentic AI infrastructure for organizations that want to own their AI workspace, not rent it. Give your teams an AI workspace like Claude.ai or ChatGPT with full control over your data, knowledge, and infrastructure.',
      ctaLabel: 'Get Started',
      features: [
        { icon: 'Bot', title: 'Agentic AI Harness', body: 'Orchestration, reasoning, and tool use across autonomous agents.' },
        { icon: 'Library', title: 'Unified Knowledge System', body: 'Wiki, Vectors, and Graph unified into a single knowledge layer.' },
        { icon: 'Brain', title: 'Triple Memory', body: 'Episodic, Semantic, and Procedural memory for durable context.' },
        { icon: 'Plug', title: 'MCP Hub', body: 'A standard protocol hub for integrating tools.' },
        { icon: 'Sparkles', title: 'Skills + Marketplace', body: 'User-created, shareable automation skills.' },
        { icon: 'UserCog', title: 'Personas', body: 'Configurable AI personas tailored per use case.' },
        { icon: 'Server', title: 'Infrastructure Manager', body: 'A GUI for managing vLLM, Ollama, and SGLang.' },
        { icon: 'Rocket', title: 'One-Click Deployment', body: 'A catalog of AI apps plus support for custom repos.' },
        { icon: 'KeyRound', title: 'API Token System', body: 'Let external applications integrate securely via API.' },
        { icon: 'Network', title: 'Hybrid LLM Routing', body: 'Transparent routing between Cloud and On-Premise models.' },
      ],
      extra: { techStack: ['Next.js 15', 'Bun + Elysia', 'PostgreSQL + pgvector + Apache AGE', 'vLLM · LiteLLM · BGE-M3 · MCP', 'Docker · Cloudflare Tunnel · Caddy'] },
    },
    th: {
      eyebrow: 'ผลิตภัณฑ์ · Logix',
      title: 'แพลตฟอร์ม AI อธิปไตยของคุณ',
      intro: 'Logix คือโครงสร้างพื้นฐาน AI เชิงเอเจนต์สำหรับองค์กรที่ต้องการ "เป็นเจ้าของ" พื้นที่ทำงาน AI ของตนเอง ไม่ใช่แค่เช่าใช้ มอบพื้นที่ทำงาน AI แบบเดียวกับ Claude.ai หรือ ChatGPT ให้ทีมของคุณ พร้อมการควบคุมข้อมูล ความรู้ และโครงสร้างพื้นฐานได้อย่างเต็มที่',
      ctaLabel: 'ติดต่อเรา',
      features: [
        { icon: 'Bot', title: 'Agentic AI Harness', body: 'การประสานงานเอเจนต์ การใช้เหตุผล และการเรียกใช้เครื่องมืออัตโนมัติ' },
        { icon: 'Library', title: 'ระบบความรู้แบบรวมศูนย์', body: 'รวม Wiki, Vectors และ Graph ไว้ในระบบเดียว' },
        { icon: 'Brain', title: 'หน่วยความจำสามชั้น', body: 'Episodic + Semantic + Procedural เพื่อความต่อเนื่องของบริบท' },
        { icon: 'Plug', title: 'MCP Hub', body: 'โปรโตคอลมาตรฐานสำหรับการเชื่อมต่อเครื่องมือ' },
        { icon: 'Sparkles', title: 'Skills + Marketplace', body: 'ระบบอัตโนมัติที่ผู้ใช้สร้างเองและแชร์ได้' },
        { icon: 'UserCog', title: 'Personas', body: 'กำหนดบุคลิก AI ได้ตามแต่ละกรณีการใช้งาน' },
        { icon: 'Server', title: 'ตัวจัดการโครงสร้างพื้นฐาน', body: 'GUI สำหรับจัดการ vLLM / Ollama / SGLang' },
        { icon: 'Rocket', title: 'ติดตั้งในคลิกเดียว', body: 'แคตตาล็อกแอป AI พร้อมรองรับ repo ที่กำหนดเอง' },
        { icon: 'KeyRound', title: 'ระบบ API Token', body: 'ให้แอปภายนอกเชื่อมต่อผ่าน API ได้อย่างปลอดภัย' },
        { icon: 'Network', title: 'การกำหนดเส้นทาง LLM แบบไฮบริด', body: 'กำหนดเส้นทางระหว่าง Cloud และ On-Premise อย่างโปร่งใส' },
      ],
      extra: { techStack: ['Next.js 15', 'Bun + Elysia', 'PostgreSQL + pgvector + Apache AGE', 'vLLM · LiteLLM · BGE-M3 · MCP', 'Docker · Cloudflare Tunnel · Caddy'] },
    },
  },
  {
    name: 'Proxmox Virtual Environment',
    slug: 'proxmox',
    kind: 'proxmox',
    order: 2,
    en: {
      eyebrow: 'Authorized Proxmox Reseller',
      title: 'Enterprise virtualization with',
      titleHighlight: 'Proxmox VE',
      intro: 'As an official reseller of Proxmox Server Solutions, ThinkSpace designs, deploys and operates production-grade open-source virtualization — infrastructure you fully own and control, free of vendor lock-in.',
      ctaLabel: 'Schedule a Technical Consult',
      heroChips: ['KVM + LXC', 'ZFS / Ceph', 'High Availability', 'SDN + Firewall', 'Open Source'],
      features: [
        { icon: 'Boxes', title: 'KVM + LXC', body: 'Run full virtual machines (KVM) and lightweight containers (LXC) on a single platform for maximum workload flexibility.' },
        { icon: 'Activity', title: 'HA & Live Migration', body: 'High-availability clustering with live migration of running VMs between nodes — no service interruption.' },
        { icon: 'HardDrive', title: 'Software-Defined Storage', body: 'Built-in software-defined storage with ZFS and Ceph for resilient, distributed block storage.' },
        { icon: 'Layers', title: 'Hyper-Converged Infrastructure', body: 'Converge compute, storage and networking into one HCI cluster to reduce complexity and hardware cost.' },
        { icon: 'ShieldCheck', title: 'Built-in Backup & Restore', body: 'Scheduled, integrated backup and restore for VMs and containers with point-in-time recovery.' },
        { icon: 'Network', title: 'SDN + Firewall', body: 'Software-defined networking (SDN) and an integrated firewall for cluster-, node- and VM-level security.' },
        { icon: 'MonitorCheck', title: 'Central Web Management', body: 'A single web interface to manage the entire cluster — no separate management licensing required.' },
        { icon: 'Server', title: 'Enterprise Open Source', body: 'A proven open-source platform free of vendor lock-in, with a tested Enterprise Repository for production.' },
      ],
      tiers: [
        { name: 'Basic', tagline: 'For getting into production', points: ['Enterprise Repository access', 'Stable, tested updates', 'Ticket-based support'] },
        { name: 'Standard', tagline: 'Right-sized for most workloads', featured: true, points: ['Everything in Basic', 'Faster response times', 'Cluster configuration assistance'] },
        { name: 'Premium', tagline: 'For mission-critical estates', points: ['Everything in Standard', 'Highest support level', 'Proactive architecture planning'] },
      ],
      addOns: [
        { icon: 'Database', title: 'Proxmox Backup Server', body: 'Enterprise backup solution for VMs, containers and physical hosts.', features: ['Incremental, deduplicated backups', 'Client-side encryption', 'Data integrity verification'] },
        { icon: 'Mail', title: 'Proxmox Mail Gateway', body: 'A mail gateway that filters spam and malware before it reaches your mail server.', features: ['Multi-layer spam & virus filtering', 'Quarantine and custom rules', 'Centralized reporting & statistics'] },
      ],
    },
    th: {
      eyebrow: 'ตัวแทนจำหน่ายที่ได้รับอนุญาต',
      title: 'เวอร์ชวลไลเซชันระดับองค์กรด้วย',
      titleHighlight: 'Proxmox VE',
      intro: 'ในฐานะตัวแทนจำหน่ายอย่างเป็นทางการของ Proxmox Server Solutions ทีม ThinkSpace ออกแบบ ติดตั้ง และดูแลแพลตฟอร์มเวอร์ชวลไลเซชันแบบโอเพนซอร์สที่พร้อมใช้งานในระดับองค์กร — โครงสร้างพื้นฐานที่คุณเป็นเจ้าของและควบคุมได้เต็มที่ ปราศจาก vendor lock-in',
      ctaLabel: 'นัดหมายปรึกษาทางเทคนิค',
      heroChips: ['KVM + LXC', 'ZFS / Ceph', 'High Availability', 'SDN + Firewall', 'Open Source'],
      features: [
        { icon: 'Boxes', title: 'KVM + LXC', body: 'รันทั้ง virtual machine (KVM) และ container ที่มีน้ำหนักเบา (LXC) บนแพลตฟอร์มเดียว เพื่อความยืดหยุ่นสูงสุดของเวิร์กโหลด' },
        { icon: 'Activity', title: 'HA และ Live Migration', body: 'คลัสเตอร์ที่มีความพร้อมใช้งานสูง ย้ายเครื่องเสมือนแบบ live ระหว่างโหนดได้โดยไม่ต้องหยุดให้บริการ' },
        { icon: 'HardDrive', title: 'Software-Defined Storage', body: 'สตอเรจที่กำหนดด้วยซอฟต์แวร์ในตัว รองรับ ZFS และ Ceph สำหรับ storage แบบกระจายที่ทนทาน' },
        { icon: 'Layers', title: 'Hyper-Converged Infrastructure', body: 'รวมการประมวลผล สตอเรจ และเครือข่ายไว้ในคลัสเตอร์ HCI เดียว ลดความซับซ้อนและต้นทุนฮาร์ดแวร์' },
        { icon: 'ShieldCheck', title: 'Backup & Restore ในตัว', body: 'สำรองและกู้คืนเครื่องเสมือนและคอนเทนเนอร์ตามกำหนดเวลา พร้อมการกู้คืนแบบละเอียด' },
        { icon: 'Network', title: 'SDN + Firewall', body: 'เครือข่ายที่กำหนดด้วยซอฟต์แวร์ (SDN) และไฟร์วอลล์ในตัว ควบคุมความปลอดภัยระดับคลัสเตอร์ โหนด และ VM' },
        { icon: 'MonitorCheck', title: 'การจัดการผ่านเว็บแบบรวมศูนย์', body: 'อินเทอร์เฟซเว็บเดียวสำหรับจัดการทั้งคลัสเตอร์ ไม่ต้องเสียค่าลิขสิทธิ์การจัดการเพิ่มเติม' },
        { icon: 'Server', title: 'โอเพนซอร์สระดับองค์กร', body: 'แพลตฟอร์มโอเพนซอร์สที่พิสูจน์แล้ว ปราศจาก vendor lock-in พร้อม Enterprise Repository ที่ผ่านการทดสอบ' },
      ],
      tiers: [
        { name: 'Basic', tagline: 'สำหรับการเริ่มต้นใช้งานจริง', points: ['เข้าถึง Enterprise Repository', 'อัปเดตที่ผ่านการทดสอบเพื่อความเสถียร', 'การสนับสนุนผ่านระบบ ticket'] },
        { name: 'Standard', tagline: 'เหมาะกับงานธุรกิจส่วนใหญ่', featured: true, points: ['ทุกอย่างใน Basic', 'เวลาตอบสนองที่เร็วขึ้น', 'ความช่วยเหลือในการกำหนดค่าคลัสเตอร์'] },
        { name: 'Premium', tagline: 'สำหรับสภาพแวดล้อมที่สำคัญต่อภารกิจ', points: ['ทุกอย่างใน Standard', 'ระดับการสนับสนุนสูงสุด', 'การวางแผนสถาปัตยกรรมเชิงรุก'] },
      ],
      addOns: [
        { icon: 'Database', title: 'Proxmox Backup Server', body: 'โซลูชันสำรองข้อมูลระดับองค์กรสำหรับ VM, container และโฮสต์', features: ['การสำรองข้อมูลแบบ incremental และ deduplication', 'การเข้ารหัสฝั่งไคลเอนต์', 'การตรวจสอบความสมบูรณ์ของข้อมูล'] },
        { icon: 'Mail', title: 'Proxmox Mail Gateway', body: 'เกตเวย์อีเมลที่ป้องกันสแปมและมัลแวร์ก่อนถึงเซิร์ฟเวอร์เมลของคุณ', features: ['การกรองสแปมและไวรัสแบบหลายชั้น', 'การกักกันและกฎที่ปรับแต่งได้', 'รายงานและสถิติแบบรวมศูนย์'] },
      ],
    },
  },
];

async function createProduct(p: ProductSeed) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  };

  const body = (loc: Loc) => ({
    name: p.name,
    slug: p.slug,
    kind: p.kind,
    order: p.order,
    eyebrow: loc.eyebrow,
    title: loc.title,
    titleHighlight: loc.titleHighlight,
    intro: loc.intro,
    ctaLabel: loc.ctaLabel,
    heroChips: loc.heroChips || [],
    features: loc.features,
    tiers: loc.tiers || [],
    addOns: loc.addOns || [],
    extra: loc.extra || {},
  });

  // Thai (default locale) first
  console.log(`Creating product (th): ${p.slug}...`);
  const thRes = await fetch(`${STRAPI_URL}/api/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: body(p.th) }),
  });
  if (!thRes.ok) {
    console.error(`Failed th ${p.slug}:`, await thRes.text());
    return;
  }
  const thJson = (await thRes.json()) as { data: { documentId: string } };
  const documentId = thJson.data.documentId;
  await fetch(`${STRAPI_URL}/api/products/${documentId}/actions/publish`, { method: 'POST', headers });
  console.log(`Published th ${p.slug} (${documentId})`);

  // English localization
  console.log(`Creating product (en): ${p.slug}...`);
  const enRes = await fetch(`${STRAPI_URL}/api/products/${documentId}?locale=en`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: body(p.en) }),
  });
  if (!enRes.ok) {
    console.error(`Failed en ${p.slug}:`, await enRes.text());
    return;
  }
  await fetch(`${STRAPI_URL}/api/products/${documentId}/actions/publish?locale=en`, { method: 'POST', headers });
  console.log(`Published en ${p.slug}\n`);
}

async function main() {
  if (!API_TOKEN) {
    console.error('Error: STRAPI_API_TOKEN is not set');
    process.exit(1);
  }
  console.log(`Seeding products to ${STRAPI_URL}...\n`);
  for (const p of products) {
    await createProduct(p);
  }
  console.log('Products seeding complete!');
}

main().catch(console.error);
