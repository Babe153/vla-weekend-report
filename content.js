/* Academic reading report. Edit slide copy and speaker notes here. No build step. */
window.REPORT = {
  title: 'VLA：视觉语言动作模型',
  subtitle: '八篇代表论文与研究问题',
  date: '2026 年 10 月',
  papers: [
    {id:'rt2', short:'RT-2', year:'2023', author:'Anthony Brohan et al.', title:'RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control', url:'https://arxiv.org/abs/2307.15818', project:'https://robotics-transformer2.github.io/'},
    {id:'oxe', short:'Open X-Embodiment', year:'2023', author:'Open X-Embodiment Collaboration', title:'Open X-Embodiment: Robotic Learning Datasets and RT-X Models', url:'https://arxiv.org/abs/2310.08864', project:'https://robotics-transformer-x.github.io/'},
    {id:'octo', short:'Octo', year:'2024', author:'Octo Model Team et al.', title:'Octo: An Open-Source Generalist Robot Policy', url:'https://arxiv.org/abs/2405.12213', project:'https://octo-models.github.io/'},
    {id:'openvla', short:'OpenVLA', year:'2024', author:'Moo Jin Kim et al.', title:'OpenVLA: An Open-Source Vision-Language-Action Model', url:'https://arxiv.org/abs/2406.09246', project:'https://openvla.github.io/'},
    {id:'pi0', short:'π₀', year:'2024', author:'Kevin Black et al.', title:'π₀: A Vision-Language-Action Flow Model for General Robot Control', url:'https://arxiv.org/abs/2410.24164', project:'https://www.pi.website/blog/pi0'},
    {id:'fast', short:'FAST', year:'2025', author:'Karl Pertsch et al.', title:'FAST: Efficient Action Tokenization for Vision-Language-Action Models', url:'https://arxiv.org/abs/2501.09747', project:'https://www.pi.website/research/fast'},
    {id:'pi05', short:'π₀.₅', year:'2025', author:'Physical Intelligence et al.', title:'π₀.₅: a Vision-Language-Action Model with Open-World Generalization', url:'https://arxiv.org/abs/2504.16054', project:'https://www.pi.website/blog/pi05'},
    {id:'smol', short:'SmolVLA', year:'2025', author:'Mustafa Shukor et al.', title:'SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics', url:'https://arxiv.org/abs/2506.01844', project:'https://huggingface.co/blog/smolvla'}
  ],
  slides: [
    {
      section:'开场', title:'VLA：视觉语言动作模型', type:'cover', time:'0:40', refs:['rt2','openvla','pi0'],
      body:`<div class="cover-copy"><p class="eyebrow">机器人学习 · 文献汇报</p><h1>VLA<span>视觉语言动作模型</span></h1><p class="cover-sub">八篇代表论文与研究问题</p><p class="cover-focus">重点：RT-2、OpenVLA、π₀</p><p class="cover-meta">2026 年 10 月<br>约 20 分钟 · 代表作阅读，非最新模型排名</p></div><figure class="cover-figure"><img src="assets/pi0-tasks.jpg" alt="π₀ 原论文中的双臂机器人折叠衣物任务" width="1200" height="700"><figcaption>π₀ 原论文 Figure 2 · 图片归原作者所有</figcaption></figure>`,
      notes:`老师好，这次我围绕视觉语言动作模型整理了八篇代表论文。重点想回答三个问题：视觉语言知识怎样连接到机器人动作，离散动作与连续动作生成各有什么取舍，以及这些模型在实际泛化中还缺少什么。我会重点讲 RT-2、OpenVLA 和 π₀，再用其余五篇补充数据、效率和开放环境泛化。最后提出一个可以先做小规模验证的研究计划。这是代表作的阅读汇报，不代表截至今天的最新性能排名。`
    },
    {
      section:'背景', title:'VLA 的任务定义', time:'0:55', refs:['rt2','openvla','pi0'],
      body:`<p class="lead">机器人根据图像和语言指令，预测可以执行的动作。</p><div class="equation">π<sub>θ</sub>(A<sub>t</sub> ∣ I<sub>t</sub>, ℓ, q<sub>t</sub>)</div><dl class="terms"><div><dt>观察 I<sub>t</sub></dt><dd>单视角或多视角图像</dd></div><div><dt>指令 ℓ</dt><dd>例如“把红杯子放进抽屉”</dd></div><div><dt>状态 q<sub>t</sub></dt><dd>关节等本体感知，是否使用取决于模型</dd></div><div><dt>动作 A<sub>t</sub></dt><dd>单步动作，或未来一段动作序列</dd></div></dl><p class="takeaway">关键连接：语义理解如何落到空间位置与运动控制。</p>`,
      notes:`这里先统一概念。VLA 的输出是机器人动作，可以是末端位姿变化、夹爪开合，也可以是一段关节动作序列。公式只是概括，三篇模型的具体输入并不完全相同，例如原始 OpenVLA 主要使用单张图像，而 π₀ 还使用多视角图像和机器人状态。VLA 预测的动作通常仍由底层控制器执行，因此端到端学习不意味着取消控制器。后面比较时，我会分别看输入、动作表示、训练方式和闭环执行。`
    },
    {
      section:'论文地图', title:'八篇论文的分工', time:'0:55', refs:['rt2','oxe','octo','openvla','pi0','fast','pi05','smol'],
      body:`<div class="table-wrap"><table class="paper-map"><thead><tr><th>论文 / 首发年</th><th>主要贡献</th><th>本次关注</th></tr></thead><tbody><tr><td>RT-2 · 2023</td><td>VLM 直接预测动作 token</td><td>核心方法</td></tr><tr><td>Open X-Embodiment · 2023</td><td>跨机器人数据与 RT-X</td><td>数据基础</td></tr><tr><td>Octo · 2024</td><td>可适配的通用扩散策略</td><td>相关路线</td></tr><tr><td>OpenVLA · 2024</td><td>开放权重与高效微调</td><td>核心方法</td></tr><tr><td>π₀ · 2024</td><td>VLM 与 flow matching</td><td>核心方法</td></tr><tr><td>FAST · 2025</td><td>压缩式动作 tokenization</td><td>动作表示</td></tr><tr><td>π₀.₅ · 2025</td><td>异构任务共同训练与家庭泛化</td><td>泛化</td></tr><tr><td>SmolVLA · 2025</td><td>小模型与异步执行</td><td>部署效率</td></tr></tbody></table></div><p class="small">Octo 定位为相关的通用机器人策略，未采用与 OpenVLA 相同的预训练生成式 VLM 路线。</p>`,
      notes:`这八篇可以按问题来组织。RT-2 提供核心范式，Open X-Embodiment 解释机器人数据如何整合，Octo 展示通用策略的另一种设计。OpenVLA 让 VLA 更便于公开研究，π₀ 重点解决连续高频动作。FAST 研究如何编码动作，SmolVLA 关注低成本部署，π₀.₅ 关注陌生家庭环境泛化。年份统一按首次预印本发布计算，避免与正式会议年份混淆。这里的分类是为了阅读，各篇实际贡献有交叉。`
    },
    {
      section:'RT-2', title:'RT-2：把动作纳入语言模型的输出', color:'blue', time:'1:10', refs:['rt2'], source:'§3.1–3.2，Figure 1',
      body:`<p class="lead">沿用预训练 VLM，将机器人控制写成动作 token 预测任务。</p><figure class="paper-figure"><button class="zoom" data-image="assets/rt2-method.png" aria-label="放大 RT-2 方法图"><img src="assets/rt2-method.png" alt="RT-2 原论文 Figure 1：图像和指令进入视觉语言模型，输出离散动作 token" loading="lazy"></button><figcaption>原论文 Figure 1 · 点击查看大图</figcaption></figure><div class="columns"><div><h3>动作表示</h3><p>连续维度均匀离散为 256 档，再映射到已有词表 token。</p></div><div><h3>共同微调</h3><p>机器人轨迹与网络视觉语言任务共同训练，保留语义知识。</p></div></div>`,
      notes:`RT-2 的关键在于用统一的 token 输出空间连接语言任务和机器人动作。它基于 PaLI-X 或 PaLM-E，把位置和旋转变化、夹爪状态等编码成离散符号，动作格式还包含终止信号。训练时不仅使用机器人示范，也继续混合视觉问答等网络任务。这样机器人动作预测能够共享已有的视觉语言知识。需要注意，图中的动作数字是编码，不是让机器人直接执行自然语言。推理时还要将 token 解码为数值动作。`
    },
    {
      section:'RT-2', title:'RT-2 的证据与能力边界', color:'blue', time:'1:05', refs:['rt2'], source:'§3.3、§4–5',
      body:`<div class="statline"><div><strong>约 6,000</strong><span>机器人评估试验</span></div><div><strong>1–3 Hz</strong><span>55B 版本的策略推理频率</span></div></div><div class="columns"><div><h3>论文支持的结论</h3><ul><li>提升新物体和语义指令的泛化。</li><li>能把已有操作技能用于新的语义情境。</li></ul></div><div><h3>作者明确的局限</h3><ul><li>网络预训练没有直接带来全新的运动技能。</li><li>计算成本高，高频控制存在瓶颈。</li><li>底座与数据的可获得性限制复现。</li></ul></div></div><p class="takeaway">语义迁移的证据，需要与运动技能的覆盖范围分开讨论。</p>`,
      notes:`RT-2 做了约六千次机器人评估，主要价值在于展示语义知识可以迁移到实际动作选择。例如面对新的符号或关系指令，机器人能重新使用已有技能。不过作者也明确说，额外的网络经验没有让它直接学会新的运动方式。另一个限制是推理成本，论文中的 55B 版本通过云端服务达到约一到三赫兹。这个数字属于特定模型与硬件系统，不能当作所有 VLA 的速度上限。我的阅读判断是，RT-2 最有说服力的是语义泛化，而精细控制仍受动作数据与推理条件约束。`
    },
    {
      section:'OpenVLA', title:'OpenVLA：开放的视觉语言动作基线', color:'teal', time:'1:05', refs:['openvla'], source:'§3，Figure 2',
      body:`<p class="lead">DINOv2 与 SigLIP 提取视觉特征，Llama 2 预测离散动作。</p><figure class="paper-figure"><button class="zoom" data-image="assets/openvla-method.png" aria-label="放大 OpenVLA 架构图"><img src="assets/openvla-method.png" alt="OpenVLA 原论文 Figure 2：双视觉编码器、投影层、Llama 2 与七维动作输出" loading="lazy"></button><figcaption>原论文 Figure 2 · 点击查看大图</figcaption></figure><p class="takeaway">研究价值：提供可检查、可适配的模型与训练实现。</p>`,
      notes:`OpenVLA 延续离散动作的自回归路线，但更强调公开实现和适配。图中两个视觉编码器分别提供特征，拼接后通过投影层进入语言模型，再结合指令预测七维动作。它基于 Prismatic VLM，语言底座是 Llama 2。与 RT-2 相比，研究者更容易检查模型、替换组件和进行微调。这里要避免把开放实现理解成所有预训练数据都完全透明，底座模型的数据公开程度仍然不同。`
    },
    {
      section:'OpenVLA', title:'OpenVLA 的训练与任务适配', color:'teal', time:'1:00', refs:['openvla'], source:'§3.2–3.4、§5.3–5.4',
      body:`<div class="statline"><div><strong>7B</strong><span>模型规模的常用标称</span></div><div><strong>970k</strong><span>真实机器人示范轨迹</span></div></div><ol class="numbered"><li><strong>数据整理</strong><span>从 OXE 筛选输入和动作较一致的数据，并调整混合权重。</span></li><li><strong>动作监督</strong><span>逐维离散成 256 档，只在动作 token 上计算交叉熵。</span></li><li><strong>新任务适配</strong><span>使用 LoRA 减少待训练参数，量化降低推理显存需求。</span></li></ol><p class="small">动作分档采用训练数据的 1%–99% 分位区间，减弱离群值影响。</p>`,
      notes:`OpenVLA 使用约九十七万条真实机器人示范。这里的数量单位是轨迹，不是图像帧，也不能直接与 π₀ 的小时数比较。动作编码仍是每个维度二百五十六档，但边界使用分位数，减少极端值对精度的影响。机器人动作训练的损失只计算动作 token。适配新任务时，论文探索 LoRA 和量化，让实验更容易开展。需要区分这一训练配方与 RT-2 的网络任务共同微调，不能把两者描述为完全相同的训练过程。`
    },
    {
      section:'OpenVLA', title:'OpenVLA 的实验结论与局限', color:'teal', time:'1:05', refs:['openvla'], source:'§5.1、§6',
      body:`<div class="highlight"><strong>+16.5 个百分点</strong><p>在作者的 29 项任务评估中，相比 RT-2-X（55B）的绝对成功率提升。</p></div><div class="columns"><div><h3>这个结果说明</h3><p>在该评测设置下，数据、视觉特征与训练设计可以让较小模型取得更好结果。</p></div><div><h3>原始版本仍受限于</h3><ul><li>单图输入，缺少显式观察历史与本体状态。</li><li>逐 token 解码，高频与灵巧任务受限。</li><li>可靠性不足以视为稳定的通用控制器。</li></ul></div></div><p class="small">比较对象是 RT-2-X。该结论不能外推为所有场景中优于 RT-2 系列。</p>`,
      notes:`OpenVLA 报告的代表性结果，是在二十九项任务中比 RT-2-X 的绝对成功率高十六点五个百分点。这个比较同时涉及不同的数据与组件，因此不能把提升全部归因于某个单独结构，也不能说模型越小越好。作者指出原始版本只支持单图观察，高频控制和更灵巧的双臂操作仍有困难。这里特意限定为原论文版本，后续改进可能已经补上部分问题。做选题时必须进一步检查这些后续工作。`
    },
    {
      section:'π₀', title:'π₀：VLM 与连续动作专家', color:'rust', time:'1:10', refs:['pi0'], source:'§III–IV，Figure 3',
      body:`<p class="lead">PaliGemma 提供视觉语言表征，动作专家通过 flow matching 生成动作序列。</p><figure class="paper-figure"><button class="zoom" data-image="assets/pi0-method.png" aria-label="放大 π₀ 方法图"><img src="assets/pi0-method.png" alt="π₀ 原论文 Figure 3：预训练数据混合、视觉语言底座和连续动作专家" loading="lazy"></button><figcaption>原论文 Figure 3 · 点击查看大图</figcaption></figure><div class="columns"><p><strong>输入</strong><br>多视角图像、语言、本体状态</p><p><strong>输出</strong><br>连续动作块 A<sub>t</sub>，论文设置 H = 50</p></div>`,
      notes:`π₀ 关注的是如何把视觉语言模型接到连续动作生成上。它以 PaliGemma 为底座，并增加处理机器人状态和动作的专门参数，也就是动作专家。输入包含多个摄像头、语言指令以及关节状态，输出是未来一段连续动作，而不是逐维预测离散编号。论文主要模型约三十三亿参数，其中动作专家约三亿。架构与数据配方共同构成方法，不能只把它概括成给语言模型接一个动作头。`
    },
    {
      section:'π₀', title:'Flow matching 与动作分块', color:'rust', time:'1:15', refs:['pi0'], source:'§IV，公式 1–2',
      body:`<div class="columns"><div><h3>训练：学习修正方向</h3><div class="equation compact">A<sup>τ</sup> = τA + (1 − τ)ε</div><p>在示范动作与随机噪声之间采样，预测向量场 A − ε。</p></div><div><h3>推理：连续更新整段动作</h3><div class="equation compact">A<sup>τ+δ</sup> = A<sup>τ</sup> + δv<sub>θ</sub></div><p>从噪声出发，论文采用 10 次积分更新，得到动作块。</p></div></div><hr><dl class="terms two"><div><dt>分块的收益</dt><dd>共同建模动作间的时间关系，减少逐个离散 token 解码。</dd></div><div><dt>执行的取舍</dt><dd>执行越长的动作前缀，重新观察和纠错的时机会越少。</dd></div></dl><p class="small">论文报告最高 50 Hz 的动作控制。它不等于每秒进行 50 次完整模型推理。</p>`,
      notes:`直观地说，flow matching 学习如何把随机动作逐步修正为合理的动作序列。训练时，将真实动作和噪声插值，并学习对应的修正方向。推理时，从噪声开始沿预测向量场积分，论文使用十步。动作分块使模型能够一次考虑未来多个时刻。这里还要区分动作块长度、模型重新规划频率和底层动作执行频率。π₀ 的最高五十赫兹指动作控制能力，不能直接与 RT-2 的完整策略查询频率作同口径比较。执行较长前缀对纠错的影响，是我们可以进一步测量的系统问题。`
    },
    {
      section:'π₀', title:'π₀ 的训练配方与能力边界', color:'rust', time:'1:05', refs:['pi0'], source:'§V–VII',
      body:`<div class="columns"><div><h3>多样数据预训练</h3><p>混合自采操作数据与开放机器人数据，获得较广的行为覆盖。</p><h3>高质量数据后训练</h3><p>进一步适配折衣、装盒等复杂任务，提高动作熟练程度。</p></div><div><h3>作者仍未解决的问题</h3><ul><li>哪类数据更有效，混合权重如何确定？</li><li>达到高可靠性需要多少数据？</li><li>跨任务、跨机器人迁移能扩展多远？</li></ul></div></div><p class="takeaway">连续动作架构改善控制表达，复杂任务仍依赖数据覆盖与适配。</p><p class="small">原论文使用多种指标，复杂任务含部分完成得分，不能一律称为“成功率”。</p>`,
      notes:`π₀ 的另一个重点是预训练与后训练的分工。多样数据让模型具备更广的行为经验，高质量后训练数据让它在具体复杂任务上更熟练。论文中一些困难任务显著依赖后训练，所以演示折衣服不意味着模型在任意家庭里都能零样本完成。作者也指出，如何组成数据、如何设定权重，以及需要多少数据才能稳定成功，仍然不清楚。部分复杂任务使用分阶段的完成得分，我在这里不将这些指标统称为完整任务成功率。`
    },
    {
      section:'方法对比', title:'三篇核心论文的方法对比', time:'1:20', refs:['rt2','openvla','pi0'],
      body:`<div class="table-wrap"><table class="compare"><thead><tr><th>维度</th><th>RT-2</th><th>OpenVLA</th><th>π₀</th></tr></thead><tbody><tr><th>底座</th><td>PaLI-X / PaLM-E</td><td>Prismatic / Llama 2</td><td>PaliGemma</td></tr><tr><th>动作</th><td>逐维离散 token</td><td>逐维离散 token</td><td>连续动作块</td></tr><tr><th>目标</th><td>token 预测</td><td>动作 token 交叉熵</td><td>条件 flow matching</td></tr><tr><th>训练配方</th><td>网络任务与机器人共同微调</td><td>VLM 初始化与机器人动作训练</td><td>多机器人预训练与任务后训练</td></tr><tr><th>主要价值</th><td>语义知识迁移</td><td>开放研究与高效适配</td><td>灵巧操作与连续控制</td></tr><tr><th>主要代价</th><td>推理与复现成本</td><td>原版输入和解码受限</td><td>迭代生成与数据需求</td></tr></tbody></table></div><p class="small">比较原始设计。数据、硬件和评测不同，表中没有跨论文成功率排名。</p>`,
      notes:`把三篇放在一起，可以看到两类动作表示和几种不同训练配方。RT-2 和 OpenVLA 都用离散 token，π₀ 使用连续动作块。但这不构成一个只替换动作头的受控实验，因为底座、输入模态和数据也不同。我的结论是，RT-2 建立语义迁移思路，OpenVLA 提供公开研究入口，π₀ 扩展了连续灵巧控制。若要研究究竟哪一种动作表示更有效，就需要固定底座、数据和执行协议，再比较不同输出设计。`
    },
    {
      section:'相关工作', title:'OXE 与 Octo：数据共享和通用策略', time:'0:55', refs:['oxe','octo'],
      body:`<div class="columns"><div><p class="eyebrow">Open X-Embodiment</p><h3>把跨机器人经验组织起来</h3><p>标准化数据格式，RT-X 展示不同机器人经验之间的正迁移。</p><p class="question">研究问题：动作语义与采样权重怎样影响迁移？</p></div><div><p class="eyebrow">Octo</p><h3>为新机器人保留适配空间</h3><p>约 800k 轨迹预训练，使用扩散策略，支持语言或目标图像及不同观察配置。</p><p class="question">研究问题：适配新输入和动作空间，需要多少任务数据？</p></div></div><p class="takeaway">数据格式一致只是起点，控制语义与任务分布仍需处理。</p>`,
      notes:`这两篇补充了核心模型之外的基础。OXE 的贡献不是简单把文件放在一起，而是支持研究跨机器人共享经验，并通过 RT-X 观察到正迁移。Octo 在这种数据基础上，强调策略对不同观察和动作空间的适配，采用扩散动作解码。它也提醒我们，能接受语言并不一定等于使用大型生成式 VLM。对于后续研究，数据格式一致并不保证动作含义一致，采样频率、坐标系和数据混合方式都可能影响迁移结果。`
    },
    {
      section:'相关工作', title:'FAST 与 SmolVLA：效率来自不同环节', time:'0:55', refs:['fast','smol'],
      body:`<div class="columns"><div><p class="eyebrow">FAST · 动作表示</p><h3>压缩整段动作的 token</h3><p>用频域变换减少高频动作序列的冗余，使自回归建模更有效。</p><p class="small">论文最高约 5 倍改善指训练时间，取决于实验设置。</p></div><div><p class="eyebrow">SmolVLA · 系统部署</p><h3>小模型与异步执行</h3><p>约 450M 参数，结合社区数据，将动作预测与执行解耦。</p><p class="small">单 GPU 可训练，不等于所有任务都能以同样成本复现。</p></div></div><p class="takeaway">训练耗时、推理延迟、执行频率，需要分别测量。</p>`,
      notes:`FAST 和 SmolVLA 都讨论效率，但切入点不同。FAST 先处理动作序列的冗余，通过频域压缩构建动作 token，使自回归模型更适合高频控制数据。论文中最高五倍的改善是训练时间，不是机器人移动速度。SmolVLA 则采用较小模型，并通过异步推理让执行不必逐次等待模型完成。我的阅读判断是，效率问题应该拆成训练、预测和执行三个阶段，每项都与硬件和任务条件有关。`
    },
    {
      section:'相关工作', title:'π₀.₅：陌生家庭中的泛化', time:'0:55', refs:['pi05'],
      body:`<p class="lead">通过异构任务共同训练，连接高层语义与低层动作。</p><dl class="terms"><div><dt>数据来源</dt><dd>多机器人操作、网络数据与其他任务监督</dd></div><div><dt>训练内容</dt><dd>图像、语言、目标检测、语义子任务与动作</dd></div><div><dt>主要证据</dt><dd>在未见过的家庭中执行厨房、卧室整理等长程任务</dd></div><div><dt>阅读边界</dt><dd>新环境的泛化，仍需结合训练任务覆盖范围解释</dd></div></dl><p class="question">评测时分别记录：新场景、新物体、新指令、新技能。</p>`,
      notes:`π₀.₅ 把问题进一步推进到实验室之外。它利用异构数据和任务共同训练，包括高层语义监督以及低层动作，展示在新家庭里执行较长的操作任务。这里最值得学习的是泛化的定义和数据之间的知识转移。新家庭并不自动等于所有任务和所有技能都是新的。做汇报和设计实验时，应明确哪些维度在训练中见过，哪些维度没有见过，并通过消融检查收益来自哪些数据来源。`
    },
    {
      section:'局限与评测', title:'VLA 仍需回答的可靠性问题', time:'1:00', refs:['rt2','openvla','pi0','pi05'],
      body:`<div class="table-wrap"><table><thead><tr><th>问题</th><th>为什么会影响结论</th><th>建议记录</th></tr></thead><tbody><tr><td>语言是否真正起作用</td><td>场景线索可能替代指令</td><td>相同场景，更换目标指令</td></tr><tr><td>动作是否能及时纠错</td><td>延迟和执行前缀影响闭环反馈</td><td>延迟 P50/P95、失败恢复</td></tr><tr><td>泛化是否存在混淆</td><td>物体、背景、任务可能共同变化</td><td>按单一变化因素分组</td></tr><tr><td>指标是否可比较</td><td>部分得分与完整成功率含义不同</td><td>口径、试验数、置信区间</td></tr></tbody></table></div><p class="small">本页是基于文献的评测建议，未报告新的实验结果。</p>`,
      notes:`综合这些论文，我认为后续实验首先要把可靠性拆开测。一个模型成功拿起目标，并不足以证明它使用了语言，因为物体位置可能已经泄露答案。动作生成也必须放在真实闭环里评估，离线动作误差无法代替控制效果。泛化实验要尽量只改变一个因素，并记录完整成功、部分完成和失败恢复。这里列的是我根据文献整理的评测建议，不是某篇论文已经证明的统一结论，更不是我已经完成的实验。`
    },
    {
      section:'后续研究', title:'三个候选研究方向', time:'1:05', refs:['fast','smol','pi05','openvla','pi0'],
      body:`<div class="research-list"><article><span class="index">01</span><div><h3>语言条件下的稳健控制 <small>优先验证</small></h3><p>同义改写和干扰物出现时，目标选择是否稳定？以配对评测和少量数据增强为起点。</p></div></article><article><span class="index">02</span><div><h3>延迟约束下的动作分块</h3><p>固定底座与数据，比较不同执行前缀长度的成功率、纠错时间和推理成本。</p></div></article><article><span class="index">03</span><div><h3>固定预算下的数据选择</h3><p>比较随机采样与失败、稀缺场景优先采样，观察新场景泛化是否改善。</p></div></article></div><p class="small">以上为候选问题。需进一步检索 2025–2026 年后续研究，确认研究空缺和新颖性。</p>`,
      notes:`我把后续方向收敛成三个可验证问题。优先考虑语言条件稳健性，因为可以先固定一个公开模型，构建配对评测，再尝试少量数据增强。第二个方向是动作分块与延迟，研究在同样模型下执行多长的动作前缀更合适。第三个方向是数据选择，在相同预算下观察哪些数据最值得补充。这些目前都是候选问题，不能直接宣称创新。特别是距离原始论文已经有后续进展，需要进一步检索近两年的工作，再确定具体差异。`
    },
    {
      section:'实验建议', title:'首轮验证：语言稳健性', time:'1:10', refs:['openvla','smol'],
      body:`<p class="lead">假设：语义保持的数据增强，可以改善同义指令下的目标选择。</p><div class="columns"><div><h3>实验对照</h3><ul><li>固定同一底座、训练预算与动作表示。</li><li>对照原始数据与加入同义改写的数据。</li><li>同一初始场景使用原指令、同义指令、改变目标的指令。</li></ul></div><div><h3>主要指标</h3><ul><li>任务成功率与目标选择正确率。</li><li>同义指令之间的表现差距。</li><li>改变目标时是否跟随新指令。</li><li>推理延迟与配对差值置信区间。</li></ul></div></div><p class="small">先用仿真或已有平台做小样本试验。任务、种子与评测指令隔离，防止数据泄漏。</p>`,
      notes:`这一页是一个拟议实验，还没有结果。先根据可用显卡和平台选择 OpenVLA 或 SmolVLA 中的一个作为底座，两组训练都使用相同预算，只改变是否加入同义改写。评测采用相同初始状态的配对试验。原指令和同义指令应该要求相同目标，另设改变目标的指令，检查模型是否真的跟随语义，而不是对所有指令都做相同行为。训练与测试的指令模板和任务划分要隔离。先做小样本验证评测是否有效，再增加试验规模并报告不确定性。`
    },
    {
      section:'讨论', title:'阶段判断与下一步安排', time:'0:55', refs:['rt2','openvla','pi0'],
      body:`<p class="lead">本轮阅读的重点，是理解语义迁移、动作表示和数据配方之间的关系。</p><dl class="terms two"><div><dt>第 1 周</dt><dd>确认硬件和任务，跑通一个公开基线，检查评测口径。</dd></div><div><dt>第 2 周</dt><dd>构建配对指令集，整理目标选择与动作执行的失败案例。</dd></div><div><dt>第 3–4 周</dt><dd>检索后续工作，完成小规模干预和消融，再决定是否扩展。</dd></div><div><dt>希望与导师确认</dt><dd>优先研究语义泛化还是控制效率？使用仿真还是现有机器人平台？</dd></div></dl><p class="small">以上是待讨论的计划，规模取决于可用算力、数据和实验平台。</p>`,
      notes:`最后总结我的阶段判断。RT-2 说明语义知识可以用于动作决策，OpenVLA 提供开放适配入口，π₀ 展示连续动作和分阶段训练对复杂操作的价值。接下来我希望先跑通一个公开基线，建立可解释的失败分类，再根据结果选择干预方法。如果语言已经表现稳健，就转向控制延迟或数据选择问题。这里的四周只是建议安排，想与老师确认的是研究优先级和平台条件，这会决定实验规模，以及应该优先看哪些后续工作。`
    },
    {
      section:'参考文献', title:'参考文献 01–04', type:'references', time:'按需', refs:['rt2','oxe','octo','openvla'], paperIds:['rt2','oxe','octo','openvla'],
      notes:`这一页列出前四篇论文的完整标题、作者、首次发布年份和原文链接。RT-2、OXE、Octo 和 OpenVLA 分别对应核心范式、数据基础、通用策略与开放实现。需要进一步讨论具体实现时，可以直接打开每条后的官方项目页。方法页使用的 RT-2 和 OpenVLA 图均来自原论文，并在页面中保留了图号与来源。`
    },
    {
      section:'参考文献', title:'参考文献 05–08 与 Workshop', type:'references', time:'按需', refs:['pi0','fast','pi05','smol'], paperIds:['pi0','fast','pi05','smol'],
      body:`<p class="small">补充入口：<a href="https://icra2026vlapipeline.github.io/" target="_blank" rel="noopener noreferrer">ICRA 2026 · VLA Pipelines for Real Robots</a>；<a href="https://corl25-genpriors.github.io/" target="_blank" rel="noopener noreferrer">CoRL 2025 · Generalizable Priors for Robot Manipulation</a></p><p class="small">首发年份用于文献脉络。π₀ 方法与公式核对版本：arXiv v4（2026-01-08）。汇报整理日期：2026-10-19。</p>`,
      notes:`这一页列出其余四篇，以及两个可以继续跟踪报告和研究问题的 workshop。π₀ 的首次发布年份是二零二四年，但本次具体方法与公式核对使用的是二零二六年一月更新的第四版。FAST、π₀.₅ 和 SmolVLA 分别补充动作压缩、开放环境泛化和部署效率。所有参考链接也会附在讲稿文件里，方便汇报之后继续阅读。`
    }
  ]
};
