import { useState } from 'react'

const questions = [
  {
    prompt: 'お休みの日、いちばん心がはずむのは？',
    choices: [
      { text: '友だちと気になるカフェへ', type: 'sun' },
      { text: 'ひとりで本や映画の世界へ', type: 'moon' },
      { text: '予定を決めずにおでかけ', type: 'wave' },
      { text: 'おうちで好きなことに没頭', type: 'star' },
    ],
  },
  {
    prompt: 'グループでいるときのあなたは？',
    choices: [
      { text: 'みんなに話をふる聞き上手', type: 'sun' },
      { text: 'じっくり考えてから話すタイプ', type: 'moon' },
      { text: '場の空気を軽くするムードメーカー', type: 'wave' },
      { text: '好きな話題になると止まらない', type: 'star' },
    ],
  },
  {
    prompt: '新しいことを始めるときは？',
    choices: [
      { text: 'まずやってみる！', type: 'wave' },
      { text: '小さな目標を決めて進む', type: 'sun' },
      { text: '調べてからじっくり準備', type: 'moon' },
      { text: '自分らしいやり方を考える', type: 'star' },
    ],
  },
  {
    prompt: '友だちが落ち込んでいたら？',
    choices: [
      { text: 'そばにいて、まず話を聞く', type: 'sun' },
      { text: '気分転換に外へ連れ出す', type: 'wave' },
      { text: '相手の気持ちを想像して言葉を選ぶ', type: 'moon' },
      { text: 'その子が笑えることを考える', type: 'star' },
    ],
  },
  {
    prompt: '理想の休日を色にたとえるなら？',
    choices: [
      { text: 'ぽかぽかのひだまり色', type: 'sun' },
      { text: '静かな夜空のむらさき色', type: 'moon' },
      { text: '透きとおる海の水色', type: 'wave' },
      { text: 'きらきら弾けるレモン色', type: 'star' },
    ],
  },
  {
    prompt: '褒められるとうれしいのは？',
    choices: [
      { text: '「一緒にいると安心する」', type: 'sun' },
      { text: '「よく気づいてくれるね」', type: 'moon' },
      { text: '「行動力があってすてき！」', type: 'wave' },
      { text: '「発想がおもしろい！」', type: 'star' },
    ],
  },
  {
    prompt: 'ちょっと疲れたときの回復方法は？',
    choices: [
      { text: '好きな人とおしゃべり', type: 'sun' },
      { text: '静かな場所でひと息つく', type: 'moon' },
      { text: '散歩して風にあたる', type: 'wave' },
      { text: '好きなものを作ったり描いたり', type: 'star' },
    ],
  },
  {
    prompt: '自分のいいところ、近いのはどれ？',
    choices: [
      { text: '人をあたたかく包みこめる', type: 'sun' },
      { text: '小さな変化に気づける', type: 'moon' },
      { text: '新しい景色を見つけにいける', type: 'wave' },
      { text: '自分だけの世界を持っている', type: 'star' },
    ],
  },
]

const profiles = {
  sun: {
    name: 'ひだまりのこぐま',
    emoji: '🐻',
    color: 'コーラルピンク',
    tagline: 'あなたのやさしさが、みんなの帰る場所。',
    description: '人の気持ちに寄りそえる、あたたかな安心感の持ち主。あなたがいるだけで、場の空気がふんわりやわらぎます。がんばりすぎた日は、自分にも「おつかれさま」を忘れずに。',
    traits: ['思いやり上手', '聞き上手', 'ほっとする存在'],
    className: 'sun',
    note: '自分の気持ちも、誰かに話してみてね。',
  },
  moon: {
    name: '月あかりのうさぎ',
    emoji: '🐰',
    color: 'ラベンダー',
    tagline: '静かなまなざしで、大切なものを見つける。',
    description: 'よく観察して、ことばの奥にある気持ちまで感じとれる人。ひとりの時間は、あなたの感性を育てるたいせつな栄養。自分のペースを大切にすると、魅力がもっと花ひらきます。',
    traits: ['観察力たっぷり', 'ていねい', '感性ゆたか'],
    className: 'moon',
    note: '考えすぎたら、まず深呼吸ひとつ。',
  },
  wave: {
    name: 'しおかぜのあざらし',
    emoji: '🦭',
    color: 'ミントブルー',
    tagline: '好奇心の波に乗って、まだ知らない景色へ。',
    description: 'フットワークが軽くて、変化を楽しめる冒険家タイプ。あなたの「やってみよう」が、周りの人にも新しい一歩をくれます。ときどき立ち止まって、今の自分をほめてあげて。',
    traits: ['好奇心旺盛', '行動派', '切り替え上手'],
    className: 'wave',
    note: '急がなくても、ちゃんと前に進んでるよ。',
  },
  star: {
    name: '星くずのこねこ',
    emoji: '🐱',
    color: 'レモンイエロー',
    tagline: 'あなただけのひらめきが、世界を彩る。',
    description: '自分らしい視点やアイデアを大切にする、自由なクリエイター。夢中になれるものがあるあなたは、とっても魅力的。思いついたことを少しだけ誰かに見せると、すてきな広がりが生まれそう。',
    traits: ['ひらめき上手', 'マイペース', '夢中になれる'],
    className: 'star',
    note: '完璧じゃなくていいから、少し見せてみよう。',
  },
}

function getResult(answers) {
  const totals = { sun: 0, moon: 0, wave: 0, star: 0 }
  answers.forEach((answer) => {
    if (answer) totals[answer] += 1
  })
  return Object.keys(totals).reduce((best, type) =>
    totals[type] > totals[best] ? type : best,
  'sun')
}

function App() {
  const [screen, setScreen] = useState('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  function startQuiz() {
    setAnswers([])
    setQuestionIndex(0)
    setScreen('quiz')
  }

  function chooseAnswer(type) {
    const nextAnswers = [...answers]
    nextAnswers[questionIndex] = type
    setAnswers(nextAnswers)

    if (questionIndex === questions.length - 1) {
      setScreen('result')
    } else {
      setQuestionIndex(questionIndex + 1)
    }
  }

  function goBack() {
    if (questionIndex === 0) {
      setScreen('intro')
      return
    }
    setQuestionIndex(questionIndex - 1)
  }

  const result = profiles[getResult(answers)]
  const question = questions[questionIndex]
  const progress = ((questionIndex + 1) / questions.length) * 100

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); setScreen('intro') }}>
          <span className="brand-mark" aria-hidden="true">✿</span>
          <span>こころのいろ診断</span>
        </a>
        <span className="top-note"><span className="tiny-heart" aria-hidden="true">♥</span> きょうのあなたを見つけよう</span>
      </header>

      {screen === 'intro' && (
        <section className="intro-layout" id="top">
          <div className="intro-copy">
            <span className="eyebrow"><span className="sparkle">✦</span> YOUR LITTLE PERSONALITY QUIZ</span>
            <h1>あなたの心に咲く、<br /><span>色</span>を見つけよう。</h1>
            <p className="intro-lead">8つの質問に答えるだけ。<br />いまのあなたらしさを、かわいい動物たちが教えてくれるよ。</p>
            <div className="intro-actions">
              <button className="button button-primary" onClick={startQuiz}>診断をはじめる <span aria-hidden="true">→</span></button>
              <span className="time-note"><span aria-hidden="true">◷</span> 2分くらい</span>
            </div>
            <div className="intro-footnote"><span className="tiny-flower" aria-hidden="true">✿</span> 直感で選んでね。正解も不正解もないよ。</div>
          </div>

          <div className="hero-art" aria-label="お花と動物たちのイラスト">
            <div className="art-sun" aria-hidden="true" />
            <div className="art-orbit orbit-one" aria-hidden="true" />
            <div className="art-orbit orbit-two" aria-hidden="true" />
            <span className="art-spark spark-one" aria-hidden="true">✦</span>
            <span className="art-spark spark-two" aria-hidden="true">✳</span>
            <span className="art-spark spark-three" aria-hidden="true">✧</span>
            <span className="art-animal bear" aria-hidden="true">🐻</span>
            <span className="art-animal bunny" aria-hidden="true">🐰</span>
            <span className="art-animal seal" aria-hidden="true">🦭</span>
            <span className="art-animal kitten" aria-hidden="true">🐱</span>
            <span className="art-flower flower-left" aria-hidden="true">✿</span>
            <span className="art-flower flower-right" aria-hidden="true">✿</span>
            <span className="art-caption">little things, lovely you</span>
          </div>
        </section>
      )}

      {screen === 'quiz' && (
        <section className="quiz-wrap">
          <div className="quiz-heading">
            <span className="eyebrow"><span className="sparkle">✦</span> YOUR COLOR IS BLOOMING</span>
            <h1>心のままに、選んでみてね。</h1>
          </div>
          <div className="quiz-panel">
            <div className="progress-row">
              <button className="back-button" onClick={goBack} aria-label="前の画面に戻る">←</button>
              <div className="progress-track" role="progressbar" aria-label="診断の進捗" aria-valuenow={questionIndex + 1} aria-valuemin="1" aria-valuemax={questions.length}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <span className="question-count"><b>{String(questionIndex + 1).padStart(2, '0')}</b><i>/</i>{String(questions.length).padStart(2, '0')}</span>
            </div>
            <div className="question-body" key={questionIndex}>
              <span className="question-kicker">QUESTION {String(questionIndex + 1).padStart(2, '0')}</span>
              <h2>{question.prompt}</h2>
              <div className="choice-list">
                {question.choices.map((choice, index) => (
                  <button className="choice-button" key={choice.text} onClick={() => chooseAnswer(choice.type)}>
                    <span className={`choice-number choice-number-${index + 1}`}>{String.fromCharCode(65 + index)}</span>
                    <span>{choice.text}</span>
                    <span className="choice-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="quiz-footer"><span className="tiny-flower" aria-hidden="true">✿</span> 深く考えず、ぴんときたものを選ぼう</div>
          </div>
        </section>
      )}

      {screen === 'result' && (
        <section className={`result-wrap result-${result.className}`}>
          <div className="result-heading">
            <span className="eyebrow"><span className="sparkle">✦</span> YOUR COLOR IS HERE</span>
            <h1>あなたのこころに咲いたのは…</h1>
          </div>
          <article className="result-card">
            <div className="result-illustration">
              <span className="result-halo" aria-hidden="true" />
              <span className="result-spark result-spark-a" aria-hidden="true">✦</span>
              <span className="result-spark result-spark-b" aria-hidden="true">✧</span>
              <span className="result-animal" role="img" aria-label={result.name}>{result.emoji}</span>
              <span className="result-flower result-flower-a" aria-hidden="true">✿</span>
              <span className="result-flower result-flower-b" aria-hidden="true">✿</span>
            </div>
            <div className="result-content">
              <span className="result-color">YOUR COLOR <i /> {result.color}</span>
              <h2>{result.name}</h2>
              <p className="result-tagline">{result.tagline}</p>
              <p className="result-description">{result.description}</p>
              <div className="trait-list">{result.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
              <p className="result-note"><span aria-hidden="true">✿</span> {result.note}</p>
              <button className="button button-primary restart-button" onClick={startQuiz}>もう一度やってみる <span aria-hidden="true">↻</span></button>
            </div>
          </article>
          <p className="result-disclaimer">この診断は、あなたの魅力を見つけるための小さなヒントです。</p>
        </section>
      )}

      <footer className="site-footer"><span>made with a little bit of kindness</span><span aria-hidden="true">✿</span></footer>
    </main>
  )
}

export default App