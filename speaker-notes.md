# VLA文献汇报：模型、方法与评测

22篇论文 · 六类主题 · 方法比较与能力边界

共 28 页，主讲约 22 分钟。最后6页为参考资料。新增8篇为摘要级定位，全文待核。

## 01 VLA：视觉语言动作模型

建议用时：0:40 分钟

老师好，本次汇报整理二十二篇VLA及相关领域论文，按照通用策略、数据基础、动作与适配、评测、阶段与训练资源、鲁棒训练与诊断六组组织。重点介绍RT-2、OpenVLA和π₀的任务定义、方法与能力边界，再补充OpenVLA-OFT等方法及阶段、鲁棒性相关文献。新增八篇目前依据原始摘要整理，关键方法和实验细节还需要结合全文核对。本次内容是文献阅读与对比，没有新的实验结果。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)

## 02 VLA 的任务定义

建议用时：0:55 分钟

这里先统一概念。VLA 的输出是机器人动作，可以是末端位姿变化、夹爪开合，也可以是一段关节动作序列。公式只是概括，三篇模型的具体输入并不完全相同，例如原始 OpenVLA 主要使用单张图像，而 π₀ 还使用多视角图像和机器人状态。VLA 预测的动作通常仍由底层控制器执行，因此端到端学习不意味着取消控制器。后面比较时，我会分别看输入、动作表示、训练方式和闭环执行。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)

## 03 22篇论文：按六类问题重新定位

建议用时：1:00 分钟

二十二篇论文分为六组。前四组建立策略、数据、动作建模和评测的基础，后两组介绍阶段相关训练方法与鲁棒性诊断。EGR按每帧每传感器的任务相关性门控目标，因此归入训练资源组，并不意味着它使用与Long-VLA相同的阶段划分。各组是阅读索引，不代表技术完全相同。每篇论文的五行笔记和原文链接位于配套速读手册中。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LIBERO](https://arxiv.org/abs/2306.03310v2)、[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)

## 04 RT-2：把动作纳入语言模型的输出

建议用时：1:10 分钟

RT-2 的关键在于用统一的 token 输出空间连接语言任务和机器人动作。它基于 PaLI-X 或 PaLM-E，把位置和旋转变化、夹爪状态等编码成离散符号，动作格式还包含终止信号。训练时不仅使用机器人示范，也继续混合视觉问答等网络任务。这样机器人动作预测能够共享已有的视觉语言知识。需要注意，图中的动作数字是编码，不是让机器人直接执行自然语言。推理时还要将 token 解码为数值动作。

来源（§3.1–3.2，Figure 1）：[RT-2](https://arxiv.org/abs/2307.15818)

## 05 RT-2 的证据与能力边界

建议用时：1:05 分钟

RT-2 做了约六千次机器人评估，主要价值在于展示语义知识可以迁移到实际动作选择。例如面对新的符号或关系指令，机器人能重新使用已有技能。不过作者也明确说，额外的网络经验没有让它直接学会新的运动方式。另一个限制是推理成本，论文中的 55B 版本通过云端服务达到约一到三赫兹。这个数字属于特定模型与硬件系统，不能当作所有 VLA 的速度上限。我的阅读判断是，RT-2 最有说服力的是语义泛化，而精细控制仍受动作数据与推理条件约束。

来源（§3.3、§4–5）：[RT-2](https://arxiv.org/abs/2307.15818)

## 06 OpenVLA：开放的视觉语言动作基线

建议用时：1:05 分钟

OpenVLA 延续离散动作的自回归路线，但更强调公开实现和适配。图中两个视觉编码器分别提供特征，拼接后通过投影层进入语言模型，再结合指令预测七维动作。它基于 Prismatic VLM，语言底座是 Llama 2。与 RT-2 相比，研究者更容易检查模型、替换组件和进行微调。这里要避免把开放实现理解成所有预训练数据都完全透明，底座模型的数据公开程度仍然不同。

来源（§3，Figure 2）：[OpenVLA](https://arxiv.org/abs/2406.09246)

## 07 OpenVLA 的训练与任务适配

建议用时：1:00 分钟

OpenVLA 使用约九十七万条真实机器人示范。这里的数量单位是轨迹，不是图像帧，也不能直接与 π₀ 的小时数比较。动作编码仍是每个维度二百五十六档，但边界使用分位数，减少极端值对精度的影响。机器人动作训练的损失只计算动作 token。适配新任务时，论文探索 LoRA 和量化，让实验更容易开展。需要区分这一训练配方与 RT-2 的网络任务共同微调，不能把两者描述为完全相同的训练过程。

来源（§3.2–3.4、§5.3–5.4）：[OpenVLA](https://arxiv.org/abs/2406.09246)

## 08 OpenVLA 的实验结论与局限

建议用时：1:05 分钟

OpenVLA 报告的代表性结果，是在二十九项任务中比 RT-2-X 的绝对成功率高十六点五个百分点。这个比较同时涉及不同的数据与组件，因此不能把提升全部归因于某个单独结构，也不能说模型越小越好。作者指出原始版本只支持单图观察，高频控制和更灵巧的双臂操作仍有困难。这里特意限定为原论文版本，后续改进可能已经补上部分问题。解读时应区分原论文和后续版本的能力。

来源（§5.1、§6）：[OpenVLA](https://arxiv.org/abs/2406.09246)

## 09 π₀：VLM 与连续动作专家

建议用时：1:10 分钟

π₀ 关注的是如何把视觉语言模型接到连续动作生成上。它以 PaliGemma 为底座，并增加处理机器人状态和动作的专门参数，也就是动作专家。输入包含多个摄像头、语言指令以及关节状态，输出是未来一段连续动作，而不是逐维预测离散编号。论文主要模型约三十三亿参数，其中动作专家约三亿。架构与数据配方共同构成方法，不能只把它概括成给语言模型接一个动作头。

来源（§III–IV，Figure 3）：[π₀](https://arxiv.org/abs/2410.24164)

## 10 Flow matching 与动作分块

建议用时：1:15 分钟

直观地说，flow matching 学习如何把随机动作逐步修正为合理的动作序列。训练时，将真实动作和噪声插值，并学习对应的修正方向。推理时，从噪声开始沿预测向量场积分，论文使用十步。动作分块使模型能够一次考虑未来多个时刻。这里还要区分动作块长度、模型重新规划频率和底层动作执行频率。π₀ 的最高五十赫兹指动作控制能力，不能直接与 RT-2 的完整策略查询频率作同口径比较。执行较长前缀会影响重新观察和纠错的机会，因此需要区分生成机制与执行机制。

来源（§IV，公式 1–2）：[π₀](https://arxiv.org/abs/2410.24164)

## 11 π₀ 的训练配方与能力边界

建议用时：1:05 分钟

π₀ 的另一个重点是预训练与后训练的分工。多样数据让模型具备更广的行为经验，高质量后训练数据让它在具体复杂任务上更熟练。论文中一些困难任务显著依赖后训练，所以演示折衣服不意味着模型在任意家庭里都能零样本完成。作者也指出，如何组成数据、如何设定权重，以及需要多少数据才能稳定成功，仍然不清楚。部分复杂任务使用分阶段的完成得分，我在这里不将这些指标统称为完整任务成功率。

来源（§V–VII）：[π₀](https://arxiv.org/abs/2410.24164)

## 12 三篇核心论文的方法对比

建议用时：1:20 分钟

把三篇放在一起，可以看到两类动作表示和几种不同训练配方。RT-2 和 OpenVLA 都用离散 token，π₀ 使用连续动作块。但这不构成一个只替换动作头的受控实验，因为底座、输入模态和数据也不同。我的结论是，RT-2 建立语义迁移思路，OpenVLA 提供公开研究入口，π₀ 扩展了连续灵巧控制。若要研究究竟哪一种动作表示更有效，就需要固定底座、数据和执行协议，再比较不同输出设计。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)

## 13 OXE 与 Octo：数据共享和通用策略

建议用时：0:55 分钟

这两篇补充了核心模型之外的基础。OXE 的贡献不是简单把文件放在一起，而是支持研究跨机器人共享经验，并通过 RT-X 观察到正迁移。Octo 在这种数据基础上，强调策略对不同观察和动作空间的适配，采用扩散动作解码。它也提醒我们，能接受语言并不一定等于使用大型生成式 VLM。在解读跨机器人迁移时，数据格式一致并不保证动作含义一致，采样频率、坐标系和数据混合方式都可能影响迁移结果。

来源：[Open X-Embodiment](https://arxiv.org/abs/2310.08864)、[Octo](https://arxiv.org/abs/2405.12213)

## 14 FAST 与 SmolVLA：效率来自不同环节

建议用时：0:55 分钟

FAST 和 SmolVLA 都讨论效率，但切入点不同。FAST 先处理动作序列的冗余，通过频域压缩构建动作 token，使自回归模型更适合高频控制数据。论文中最高五倍的改善是训练时间，不是机器人移动速度。SmolVLA 则采用较小模型，并通过异步推理让执行不必逐次等待模型完成。我的阅读判断是，效率问题应该拆成训练、预测和执行三个阶段，每项都与硬件和任务条件有关。

来源：[FAST](https://arxiv.org/abs/2501.09747)、[SmolVLA](https://arxiv.org/abs/2506.01844)

## 15 π₀.₅：陌生家庭中的泛化

建议用时：0:55 分钟

π₀.₅ 把问题进一步推进到实验室之外。它利用异构数据和任务共同训练，包括高层语义监督以及低层动作，展示在新家庭里执行较长的操作任务。这里最值得学习的是泛化的定义和数据之间的知识转移。新家庭并不自动等于所有任务和所有技能都是新的。做汇报和设计实验时，应明确哪些维度在训练中见过，哪些维度没有见过，并通过消融检查收益来自哪些数据来源。

来源：[π₀.₅](https://arxiv.org/abs/2504.16054)

## 16 ACT、Diffusion Policy、LoRA：三个不同层面

建议用时：1:00 分钟

这三篇说明不同层面的设计。ACT用动作分块和时间集成减少误差累积，Diffusion Policy用条件扩散建模复杂动作分布。LoRA处理预训练模型的参数更新，不替代动作生成机制。它们可以组合，但不能依据不同任务的成功率直接排名。OpenVLA-OFT也涉及这些层面的组合，因此阅读时需要同时区分动作头、执行方式和参数适配位置。

来源：[ACT](https://arxiv.org/abs/2304.13705v1)、[Diffusion Policy](https://arxiv.org/abs/2303.04137v5)、[LoRA](https://arxiv.org/abs/2106.09685v2)

## 17 OpenVLA-OFT：从开放底座到高效适配

建议用时：1:00 分钟

OpenVLA-OFT研究如何更有效地适配OpenVLA，并不是另一个从零预训练的大模型。主要配方包括连续动作表示、并行预测、动作分块和L1训练目标。与π₀的flow matching不同，它可以直接回归动作块。原论文的成功率与速度取决于数据和评测协议。多相机、本体状态和动作头属于具体配置，加载与解释检查点时也要与LoRA参数和统计量区分。

来源：[OpenVLA](https://arxiv.org/abs/2406.09246)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LoRA](https://arxiv.org/abs/2106.09685v2)

## 18 LIBERO 与 LIBERO-Plus：先统一评测口径

建议用时：1:00 分钟

LIBERO提供任务、示范和评测环境，原始论文还研究持续学习与知识迁移。后续VLA常使用该环境的闭环成功率，这与原始持续学习指标需要区分。LIBERO-Plus进一步诊断分布偏移下的鲁棒性。解释结果时，任务、初始状态、相机、扰动方式和执行前缀都是协议的一部分。已在LIBERO上适配的检查点，与未见任务上的少样本适配也不是同一设置。

来源：[LIBERO](https://arxiv.org/abs/2306.03310v2)、[LIBERO-Plus](https://arxiv.org/abs/2510.13626v3)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)

## 19 四篇阶段与训练资源相关论文

建议用时：1:20 分钟

这四篇都讨论信息或训练资源的选择，但方法位置不同。Long-VLA在长程任务中使用阶段感知输入遮蔽；EGR根据每帧每传感器的任务相关性门控一致性目标。FrameSkip在数据加载层选择重要帧，PHASER在持续学习中安排阶段回放。比较时应区分输入干预、目标函数、训练采样和历史回放，也要区分长程操作、多模态鲁棒性与遗忘等问题设置。

来源：[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)、[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)

## 20 Long-VLA 与 EGR：输入与目标函数

建议用时：1:00 分钟

Long-VLA和EGR都关注哪些输入信息对任务有用，但干预方式不同。Long-VLA使用移动与交互阶段组织输入遮蔽，主要目标是改善长程操作中的技能衔接。EGR根据传感器证据对训练目标进行门控，低证据传感器强调不变性，高证据传感器强调单传感器充分性。因此两者不能简单视为同一种阶段算法。这里仅整理原始摘要支持的方法定位，具体公式、实现与消融需要参照全文。

来源：[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)

## 21 FrameSkip 与 PHASER：采样与回放

建议用时：1:00 分钟

FrameSkip和PHASER都处理轨迹中信息分布不均的问题，但训练设定不同。FrameSkip依据动作变化、视觉动作一致性、进度先验和夹爪转换选择帧，操作位置在数据加载层。PHASER关注持续学习，把回放支持分配给不同阶段，并根据遗忘风险调整优先级。前者的保留率与训练采样量、后者的回放容量与持续学习任务序列，都是解释其结果的重要条件。

来源：[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)

## 22 四篇鲁棒训练与诊断论文

建议用时：1:00 分钟

这四篇从不同环节讨论鲁棒性。STRONG-VLA分开处理扰动学习与干净任务再对齐；MAIL-Bench评测任务不同阶段的相机中断，MINT结合缺视图训练与选择性补全。View Collapse说明表面上的鲁棒性可能来自策略对另一视角的依赖，CARE则关注观察短暂受扰时的动作执行长度。它们共同说明，鲁棒性结果需要结合故障类型、传感器依赖、训练方式和执行机制理解。

来源：[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)、[MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1)、[View Collapse](https://arxiv.org/abs/2609.33707v1)、[CARE](https://arxiv.org/abs/2609.32550v1)

## 23 参考文献 01–04

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)、[Open X-Embodiment](https://arxiv.org/abs/2310.08864)

## 24 参考文献 05–08

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[Octo](https://arxiv.org/abs/2405.12213)、[FAST](https://arxiv.org/abs/2501.09747)、[π₀.₅](https://arxiv.org/abs/2504.16054)、[SmolVLA](https://arxiv.org/abs/2506.01844)

## 25 参考文献 09–12

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LIBERO](https://arxiv.org/abs/2306.03310v2)、[LIBERO-Plus](https://arxiv.org/abs/2510.13626v3)、[ACT](https://arxiv.org/abs/2304.13705v1)

## 26 参考文献 13–16

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[Diffusion Policy](https://arxiv.org/abs/2303.04137v5)、[LoRA](https://arxiv.org/abs/2106.09685v2)、[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)

## 27 参考文献 17–20

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)、[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)、[MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1)

## 28 参考文献 21–22

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[View Collapse](https://arxiv.org/abs/2609.33707v1)、[CARE](https://arxiv.org/abs/2609.32550v1)

## 22篇论文的完整书目

1. Anthony Brohan et al. (2023 首发). *RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control*. [原文](https://arxiv.org/abs/2307.15818) · [官方项目](https://robotics-transformer2.github.io/)

2. Moo Jin Kim et al. (2024 首发). *OpenVLA: An Open-Source Vision-Language-Action Model*. [原文](https://arxiv.org/abs/2406.09246) · [官方项目](https://openvla.github.io/)

3. Kevin Black et al. (2024 首发). *π₀: A Vision-Language-Action Flow Model for General Robot Control*. [原文](https://arxiv.org/abs/2410.24164) · [官方项目](https://www.pi.website/blog/pi0)

4. Open X-Embodiment Collaboration (2023 首发). *Open X-Embodiment: Robotic Learning Datasets and RT-X Models*. [原文](https://arxiv.org/abs/2310.08864) · [官方项目](https://robotics-transformer-x.github.io/)

5. Octo Model Team et al. (2024 首发). *Octo: An Open-Source Generalist Robot Policy*. [原文](https://arxiv.org/abs/2405.12213) · [官方项目](https://octo-models.github.io/)

6. Karl Pertsch et al. (2025 首发). *FAST: Efficient Action Tokenization for Vision-Language-Action Models*. [原文](https://arxiv.org/abs/2501.09747) · [官方项目](https://www.pi.website/research/fast)

7. Physical Intelligence et al. (2025 首发). *π₀.₅: a Vision-Language-Action Model with Open-World Generalization*. [原文](https://arxiv.org/abs/2504.16054) · [官方项目](https://www.pi.website/blog/pi05)

8. Mustafa Shukor et al. (2025 首发). *SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics*. [原文](https://arxiv.org/abs/2506.01844) · [官方项目](https://huggingface.co/blog/smolvla)

9. Moo Jin Kim et al. (2025 首发). *Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success*. [原文](https://arxiv.org/abs/2502.19645v2)

10. Bo Liu et al. (2023 首发). *LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning*. [原文](https://arxiv.org/abs/2306.03310v2)

11. Senyu Fei et al. (2025 首发). *LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action Models*. [原文](https://arxiv.org/abs/2510.13626v3)

12. Tony Z. Zhao et al. (2023 首发). *Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware*. [原文](https://arxiv.org/abs/2304.13705v1)

13. Cheng Chi et al. (2023 首发). *Diffusion Policy: Visuomotor Policy Learning via Action Diffusion*. [原文](https://arxiv.org/abs/2303.04137v5)

14. Edward J. Hu et al. (2021 首发). *LoRA: Low-Rank Adaptation of Large Language Models*. [原文](https://arxiv.org/abs/2106.09685v2)

15. Yiguo Fan et al. (2025 首发). *Long-VLA: Unleashing Long-Horizon Capability of Vision Language Action Model for Robot Manipulation*. [原文](https://arxiv.org/abs/2508.19958v2)

16. Yue Yang et al. (2026 首发). *Sensing Which Modality Matters: Evidence-Gated Regularization for Robust VLA Policies*. [原文](https://arxiv.org/abs/2609.03142v1)

17. Bin Yu et al. (2026 首发). *FrameSkip: Learning from Fewer but More Informative Frames in VLA Training*. [原文](https://arxiv.org/abs/2605.13757v1)

18. Ziyang Chen et al. (2026 首发). *PHASER: Phase-Aware and Semantic Experience Replay for Vision-Language-Action Models*. [原文](https://arxiv.org/abs/2606.03598v2)

19. Yuhan Xie et al. (2026 首发). *STRONG-VLA: Decoupled Robustness Learning for Vision-Language-Action Models under Multimodal Perturbations*. [原文](https://arxiv.org/abs/2604.10055v3)

20. Mingle Jiang et al. (2026 首发). *Learning to Act under Visual Interruptions with Vision-Language-Action Models*. [原文](https://arxiv.org/abs/2609.35003v1)

21. Futa Waseda et al. (2026 首发). *Does Adversarial Training Improve Generalization in Multi-View VLAs? Revealing and Mitigating View Collapse*. [原文](https://arxiv.org/abs/2609.33707v1)

22. Shojiro Yamabe and Jun Sakuma (2026 首发). *Are Vision-Language-Action Models Robust to One-Step Observation Perturbations?*. [原文](https://arxiv.org/abs/2609.32550v1)

图像来源见 assets/sources.json。原图与论文版权归原作者所有。本材料仅作论文阅读与方法比较，未包含新的实验结果。
