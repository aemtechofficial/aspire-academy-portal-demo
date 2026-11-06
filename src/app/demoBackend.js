// ═══════════════════════════════════════════════════════════════
// DEMO BACKEND — in-memory sample database for the product demo.
// Same query surface the portal uses (from/select/eq/order/limit/
// single/insert/update/delete), but 100% fictional sample data.
// Nothing here talks to any real database.
// ═══════════════════════════════════════════════════════════════

const NOW = Date.now()
const DAY = 864e5
const ago = n => new Date(NOW - n * DAY).toISOString()
const ahead = n => new Date(NOW + n * DAY).toISOString()
const minsAgo = m => new Date(NOW - m * 60000).toISOString()

const B1 = 'batch-demo-1'
const B2 = 'batch-demo-2'

const studentRows = [
  ['Ahmed Raza',    'male',   'Muhammad Raza',  'Karachi',   B1, 45000, '2026-08-14'],
  ['Fatima Noor',   'female', 'Noor Ahmed',     'Lahore',    B1, 45000, '2026-08-20'],
  ['Bilal Hussain', 'male',   'Ghulam Hussain', 'Karachi',   B1, 30000, '2026-08-27'],
  ['Areeba Khan',   'female', 'Imran Khan',     'Islamabad', B1, 30000, '2026-09-03'],
  ['Usman Tariq',   'male',   'Tariq Mehmood',  'Karachi',   B1, 15000, '2026-09-10'],
  ['Mahnoor Asif',  'female', 'Asif Javed',     'Lahore',    B1, 45000, '2026-09-15'],
  ['Hamza Sheikh',  'male',   'Rashid Sheikh',  'Karachi',   B1, 15000, '2026-09-22'],
  ['Zainab Ali',    'female', 'Ali Nawaz',      'Karachi',   B1, 30000, '2026-09-28'],
  ['Hassan Javed',  'male',   'Javed Iqbal',    'Hyderabad', B1, 45000, '2026-10-05'],
  ['Iqra Shahid',   'female', 'Shahid Mehmood', 'Karachi',   B1, 15000, '2026-10-12'],
  ['Ali Hamza',     'male',   'Hamza Yousuf',   'Karachi',   B2, 30000, '2026-09-08'],
  ['Sana Malik',    'female', 'Malik Aslam',    'Lahore',    B2, 45000, '2026-09-18'],
  ['Daniyal Ahmed', 'male',   'Ahmed Rauf',     'Karachi',   B2, 15000, '2026-10-01'],
  ['Hira Yousuf',   'female', 'Yousuf Karim',   'Islamabad', B2, 30000, '2026-10-09'],
]

const students = studentRows.map((r, i) => ({
  id: 'stu-' + (i + 1),
  full_name: r[0],
  gender: r[1],
  father_name: r[2],
  city: r[3],
  batch_id: r[4],
  fee_paid: r[5],
  email: r[0].toLowerCase().replace(/[^a-z ]/g, '').replace(/ +/g, '.') + '@gmail.com',
  login_email: i === 0 ? 'student@aspireacademy.pk' : r[0].toLowerCase().replace(/[^a-z ]/g, '').replace(/ +/g, '.') + '@aspireacademy.pk',
  password: 'student123',
  phone: '03' + (21 + (i % 9)) + '-55501' + String(10 + i),
  whatsapp: '03' + (21 + (i % 9)) + '-55501' + String(10 + i),
  fee_amount: 15000,
  total_fee: 45000,
  status: 'active',
  date_of_birth: '200' + (i % 5) + '-0' + (1 + (i % 9)) + '-15',
  address: r[3] + ', Pakistan',
  profile_image: null,
  last_seen: i === 0 ? minsAgo(2) : i < 4 ? minsAgo(30 + i * 20) : ago(1 + (i % 5)),
  created_at: new Date(r[6] + 'T09:00:00').toISOString(),
}))

const b1Titles = [
  'Orientation & Goal Setting', 'Design Principles That Sell', 'Canva Deep Dive',
  'Logo & Brand Kit Lab', 'Social Media Design Lab', 'Portfolio Project Week',
  'Online Store Setup Basics', 'Product Pages That Convert', 'Marketing Foundations',
  'Ads Campaign Lab', 'Client Hunting Masterclass', 'Graduation & Next Steps',
]
const b1DaysAgo = [38, 35, 31, 28, 24, 21, 17, 14, 10, 3]
const classes = []
b1Titles.forEach((t, i) => {
  const past = i < b1DaysAgo.length
  classes.push({
    id: 'cls-b1-' + (i + 1), batch_id: B1, class_number: i + 1, title: t,
    date: past ? ago(b1DaysAgo[i]).substring(0, 10) : ahead(i === 10 ? 2 : 5),
    time: '07:00 PM', status: past ? 'completed' : 'scheduled',
    recording_url: past && i % 2 === 0 ? 'https://www.youtube.com' : '',
    notes: '', created_at: ago(40),
  })
})
const b2Titles = ['Design Thinking Intro', 'Color & Typography', 'Brand Identity Project', 'Portfolio Review', 'Final Showcase']
b2Titles.forEach((t, i) => {
  const past = i < 3
  classes.push({
    id: 'cls-b2-' + (i + 1), batch_id: B2, class_number: i + 1, title: t,
    date: past ? ago([20, 13, 6][i]).substring(0, 10) : ahead(i === 3 ? 1 : 4),
    time: '05:00 PM', status: past ? 'completed' : 'scheduled',
    recording_url: past ? 'https://www.youtube.com' : '', notes: '', created_at: ago(25),
  })
})

const attendance = []
classes.filter(c => c.status === 'completed').forEach(c => {
  students.filter(s => s.batch_id === c.batch_id).forEach((s, si) => {
    const h = (si * 7 + c.class_number * 3) % 11
    attendance.push({
      id: 'att-' + c.id + '-' + s.id, class_id: c.id, student_id: s.id, batch_id: c.batch_id,
      status: h === 4 ? 'absent' : h === 8 ? 'late' : 'present',
      marked_at: c.date + 'T19:30:00', created_at: c.date + 'T19:30:00',
    })
  })
})

const assignments = [
  { id: 'asn-1', batch_id: B1, title: 'Assignment #01 · Design a Complete Logo Suite', description: 'Design a logo suite for a fictional coffee brand: primary logo, icon mark and color palette. Export as PNG and PDF.', due_date: ago(12).substring(0, 10), total_marks: 100, created_at: ago(20) },
  { id: 'asn-2', batch_id: B1, title: 'Assignment #02 · Build Your Portfolio Page', description: 'Create a one-page portfolio with your best 6 designs, contact section and a short intro video link.', due_date: ago(4).substring(0, 10), total_marks: 100, created_at: ago(13) },
  { id: 'asn-3', batch_id: B1, title: 'Final Project · Launch a Sample Store', description: 'Set up a complete sample online store with 5 products, collections and a checkout test order.', due_date: ahead(6).substring(0, 10), total_marks: 100, created_at: ago(2) },
  { id: 'asn-4', batch_id: B2, title: 'Assignment #01 · Brand Identity Board', description: 'Present a full identity board: logo, colors, typography and 3 mockups.', due_date: ago(2).substring(0, 10), total_marks: 100, created_at: ago(9) },
]

const submissions = []
const marks1 = [92, 88, 76, 95, 64, 90, 71, 85, 97, 80]
students.filter(s => s.batch_id === B1).forEach((s, i) => {
  submissions.push({ id: 'sub-1-' + s.id, assignment_id: 'asn-1', student_id: s.id, batch_id: B1, submission_link: 'https://drive.google.com', submitted_at: ago(13), marks_obtained: marks1[i], feedback: marks1[i] > 85 ? 'Excellent work, very clean execution.' : 'Good effort, polish the spacing and retry the export.', status: 'graded', created_at: ago(13) })
  if (i < 6) submissions.push({ id: 'sub-2-' + s.id, assignment_id: 'asn-2', student_id: s.id, batch_id: B1, submission_link: 'https://drive.google.com', submitted_at: ago(5), marks_obtained: i < 3 ? [84, 91, 78][i] : null, feedback: i < 3 ? 'Reviewed. Strong layout sense.' : '', status: i < 3 ? 'graded' : 'submitted', created_at: ago(5) })
})
students.filter(s => s.batch_id === B2).slice(0, 3).forEach((s, i) => {
  submissions.push({ id: 'sub-4-' + s.id, assignment_id: 'asn-4', student_id: s.id, batch_id: B2, submission_link: 'https://drive.google.com', submitted_at: ago(3), marks_obtained: [89, 82, 93][i], feedback: 'Beautiful board, presentation was confident.', status: 'graded', created_at: ago(3) })
})

const fee_payments = []
students.forEach((s, i) => {
  const monthsPaid = Math.floor(s.fee_paid / 15000)
  for (let m = 0; m < monthsPaid; m++) {
    fee_payments.push({
      id: 'fee-' + s.id + '-' + (m + 1), student_id: s.id, batch_id: s.batch_id,
      month: ['August', 'September', 'October'][m] || 'Month ' + (m + 1), year: 2026,
      amount: 15000, paid_amount: 15000, installment_no: m + 1,
      payment_method: ['Bank Transfer', 'JazzCash', 'Cash', 'EasyPaisa'][i % 4],
      receipt_number: 'REC-' + (1001 + i * 3 + m), status: 'paid',
      paid_date: ago(60 - m * 30 - (i % 7)).substring(0, 10), created_at: ago(60 - m * 30 - (i % 7)),
    })
  }
  if (monthsPaid < 3) fee_payments.push({
    id: 'fee-due-' + s.id, student_id: s.id, batch_id: s.batch_id,
    month: ['August', 'September', 'October'][monthsPaid] || 'Month ' + (monthsPaid + 1), year: 2026,
    amount: 15000, paid_amount: 0, installment_no: monthsPaid + 1,
    payment_method: '', receipt_number: '', status: i % 3 === 0 ? 'overdue' : 'pending',
    paid_date: null, created_at: ago(6),
  })
})

const mcq = (question, options, correct) => ({ question, q: question, options, correct, answer: correct })

const SEED = {
  users: [
    { id: 'usr-admin', full_name: 'Ayesha Rahman', email: 'admin@aspireacademy.pk', password_hash: 'admin123', role: 'admin', created_at: ago(90) },
  ],
  students,
  batches: [
    { id: B1, name: 'Batch 1 · Digital Skills Program', course: 'Digital Skills Program', status: 'active', start_date: ago(40).substring(0, 10), end_date: ahead(50).substring(0, 10), created_at: ago(45) },
    { id: B2, name: 'Batch 2 · Creative Design', course: 'Creative Design', status: 'active', start_date: ago(25).substring(0, 10), end_date: ahead(65).substring(0, 10), created_at: ago(30) },
  ],
  classes,
  attendance,
  assignments,
  submissions,
  fee_payments,
  admissions: [
    { id: 'adm-1', full_name: 'Usman Ghani', name: 'Usman Ghani', phone: '0321-5550190', email: 'usman.ghani@gmail.com', course: 'Digital Skills Program', course_interest: 'Digital Skills Program', source: 'Instagram', status: 'pending', notes: 'Asked about evening timings', created_at: ago(1) },
    { id: 'adm-2', full_name: 'Mehwish Tariq', name: 'Mehwish Tariq', phone: '0333-5550191', email: 'mehwish.t@gmail.com', course: 'Creative Design', course_interest: 'Creative Design', source: 'Facebook', status: 'pending', notes: '', created_at: ago(2) },
    { id: 'adm-3', full_name: 'Shahzaib Raza', name: 'Shahzaib Raza', phone: '0300-5550192', email: 'shahzaib.raza@gmail.com', course: 'Digital Skills Program', course_interest: 'Digital Skills Program', source: 'Walk-in', status: 'pending', notes: 'Will visit campus Saturday', created_at: ago(3) },
    { id: 'adm-4', full_name: 'Nimra Aslam', name: 'Nimra Aslam', phone: '0345-5550193', email: 'nimra.aslam@gmail.com', course: 'Creative Design', course_interest: 'Creative Design', source: 'Referral', status: 'contacted', notes: 'Sent fee structure on WhatsApp', created_at: ago(5) },
    { id: 'adm-5', full_name: 'Talha Zubair', name: 'Talha Zubair', phone: '0322-5550194', email: 'talha.zubair@gmail.com', course: 'Digital Skills Program', course_interest: 'Digital Skills Program', source: 'Website', status: 'enrolled', notes: 'Joined Batch 1 waitlist', created_at: ago(8) },
  ],
  announcements: [
    { id: 'ann-1', title: 'Guest Session This Friday', content: 'A senior brand designer from a Karachi agency joins us live this Friday at 7 PM. Attendance is mandatory for Batch 1 and Batch 2.', priority: 'important', created_at: ago(1) },
    { id: 'ann-2', title: 'Final Project Submissions Open', content: 'Final project submissions are now open. Submit your store link before the deadline to qualify for the showcase day.', priority: 'normal', created_at: ago(3) },
    { id: 'ann-3', title: 'Fee Reminder · October Installment', content: 'Students with a pending October installment are requested to clear it this week. Contact the admin office on WhatsApp for any issue.', priority: 'urgent', created_at: ago(5) },
  ],
  timetable: [
    { id: 'tt-1', batch_id: B1, day: 'Monday', time: '07:00 PM', topic: 'Live Class · Batch 1', title: 'Live Class · Batch 1', instructor: 'Ayesha Rahman' },
    { id: 'tt-2', batch_id: B1, day: 'Wednesday', time: '07:00 PM', topic: 'Live Class · Batch 1', title: 'Live Class · Batch 1', instructor: 'Ayesha Rahman' },
    { id: 'tt-3', batch_id: B2, day: 'Tuesday', time: '05:00 PM', topic: 'Studio Session · Batch 2', title: 'Studio Session · Batch 2', instructor: 'Ayesha Rahman' },
    { id: 'tt-4', batch_id: B2, day: 'Thursday', time: '05:00 PM', topic: 'Studio Session · Batch 2', title: 'Studio Session · Batch 2', instructor: 'Ayesha Rahman' },
    { id: 'tt-5', batch_id: B1, day: 'Friday', time: '07:00 PM', topic: 'Guest Session · All Batches', title: 'Guest Session · All Batches', instructor: 'Guest Speaker' },
    { id: 'tt-6', batch_id: B1, day: 'Saturday', time: '12:00 PM', topic: 'Assignment Help Desk', title: 'Assignment Help Desk', instructor: 'Support Team' },
  ],
  quizzes: [
    { id: 'qz-1', batch_id: B1, title: 'Quiz · Design Fundamentals', total_marks: 10, created_at: ago(9), questions: [
      mcq('Which color pairing creates the strongest contrast?', ['Black on white', 'Grey on light grey', 'Yellow on white', 'Blue on purple'], 0),
      mcq('What does a brand kit normally include?', ['Only a logo', 'Logo, colors, fonts and usage rules', 'A price list', 'Social media passwords'], 1),
      mcq('Which file format is best for a logo with transparency?', ['JPG', 'PNG', 'BMP', 'GIF'], 1),
      mcq('Whitespace in a design is used to…', ['Fill empty corners', 'Improve focus and readability', 'Make files smaller', 'Hide mistakes'], 1),
      mcq('A call to action should be…', ['Hidden in the footer', 'Clear, visible and action focused', 'Written in legal language', 'Only an image'], 1),
    ] },
    { id: 'qz-2', batch_id: B1, title: 'Quiz · Marketing Basics', total_marks: 10, created_at: ago(4), questions: [
      mcq('CTR stands for…', ['Cost To Reach', 'Click Through Rate', 'Customer Total Revenue', 'Campaign Test Report'], 1),
      mcq('The first step of any campaign is…', ['Boosting a post', 'Defining the audience and goal', 'Buying followers', 'Designing a logo'], 1),
      mcq('A landing page should have…', ['Many unrelated offers', 'One clear goal', 'No headline', 'Only videos'], 1),
    ] },
  ],
  quiz_attempts: [
    { id: 'qa-1', quiz_id: 'qz-1', student_id: 'stu-1', score: 9, total: 10, answers: [0, 1, 1, 1, 0], created_at: ago(8) },
    { id: 'qa-2', quiz_id: 'qz-1', student_id: 'stu-2', score: 10, total: 10, answers: [0, 1, 1, 1, 1], created_at: ago(8) },
    { id: 'qa-3', quiz_id: 'qz-1', student_id: 'stu-4', score: 8, total: 10, answers: [0, 1, 0, 1, 1], created_at: ago(8) },
    { id: 'qa-4', quiz_id: 'qz-1', student_id: 'stu-6', score: 7, total: 10, answers: [0, 0, 1, 1, 1], created_at: ago(7) },
    { id: 'qa-5', quiz_id: 'qz-2', student_id: 'stu-1', score: 8, total: 10, answers: [1, 1, 0], created_at: ago(3) },
    { id: 'qa-6', quiz_id: 'qz-2', student_id: 'stu-3', score: 6, total: 10, answers: [1, 0, 1], created_at: ago(3) },
  ],
}

// ─── Chainable in-memory query builder (Supabase-shaped surface) ───
class QB {
  constructor(db, table) { this.db = db; this.table = table; this.filters = []; this.op = { type: 'select' }; this.ord = null; this.lim = null; this.head = false; this.wantCount = false }
  select(cols, opts) { if (opts && opts.count) this.wantCount = true; if (opts && opts.head) this.head = true; return this }
  eq(c, v) { this.filters.push(r => String(r[c]) === String(v)); return this }
  neq(c, v) { this.filters.push(r => String(r[c]) !== String(v)); return this }
  gte(c, v) { this.filters.push(r => r[c] >= v); return this }
  gt(c, v) { this.filters.push(r => r[c] > v); return this }
  lte(c, v) { this.filters.push(r => r[c] <= v); return this }
  lt(c, v) { this.filters.push(r => r[c] < v); return this }
  in(c, arr) { this.filters.push(r => arr.map(String).includes(String(r[c]))); return this }
  is(c, v) { this.filters.push(r => r[c] === v); return this }
  order(c, o) { this.ord = { c, asc: !o || o.ascending !== false }; return this }
  limit(n) { this.lim = n; return this }
  insert(rows) { this.op = { type: 'insert', rows: Array.isArray(rows) ? rows : [rows] }; return this }
  update(obj) { this.op = { type: 'update', obj }; return this }
  upsert(rows) { this.op = { type: 'insert', rows: Array.isArray(rows) ? rows : [rows] }; return this }
  delete() { this.op = { type: 'delete' }; return this }
  rows() { return (this.db[this.table] = this.db[this.table] || []) }
  exec() {
    const all = this.rows()
    const matched = all.filter(r => this.filters.every(f => f(r)))
    if (this.op.type === 'insert') {
      const ins = this.op.rows.map(r => ({ id: r.id || 'demo-' + Math.random().toString(36).slice(2, 9), created_at: r.created_at || new Date().toISOString(), ...r }))
      ins.forEach(r => all.push(r))
      return { data: ins, error: null, count: ins.length }
    }
    if (this.op.type === 'update') { matched.forEach(r => Object.assign(r, this.op.obj)); return { data: matched, error: null, count: matched.length } }
    if (this.op.type === 'delete') { this.db[this.table] = all.filter(r => !matched.includes(r)); return { data: [], error: null, count: matched.length } }
    let out = [...matched]
    if (this.ord) out.sort((a, b) => (a[this.ord.c] < b[this.ord.c] ? -1 : a[this.ord.c] > b[this.ord.c] ? 1 : 0) * (this.ord.asc ? 1 : -1))
    if (this.lim) out = out.slice(0, this.lim)
    return { data: this.head ? null : out.map(r => ({ ...r })), error: null, count: matched.length }
  }
  async single() { const r = this.exec(); return { data: r.data && r.data[0] ? r.data[0] : null, error: r.data && r.data[0] ? null : { message: 'Row not found (demo)' }, count: r.count } }
  async maybeSingle() { const r = this.exec(); return { data: r.data && r.data[0] ? r.data[0] : null, error: null, count: r.count } }
  then(res, rej) { return Promise.resolve(this.exec()).then(res, rej) }
}

export function createDemoClient() {
  const db = JSON.parse(JSON.stringify(SEED))
  return {
    from: table => new QB(db, table),
    storage: { from: () => ({ upload: async () => ({ error: null }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) },
  }
}
