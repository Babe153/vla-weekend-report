# VLA：从文献脉络到研究选题

22篇论文 · 六类问题 · 方法比较与选题核查

共 31 页，主讲约 25 分钟。最后6页为参考资料。新增8篇为摘要级定位，全文待核。

## 01 VLA：视觉语言动作模型

建议用时：0:40 分钟

老师好，这次我将文献从原来的八篇扩展到二十二篇，按照基础模型、动作与适配方法、数据、评测，以及与选题直接相关的阶段和鲁棒性研究重新组织。重点仍是RT-2、OpenVLA和π₀，但最后会解释新检索的工作怎样改变了我对阶段定向视觉增强的判断。新增八篇目前完成原始摘要级定位，关键方法和消融还需要全文精读；本次没有新的实验结果。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)

## 02 VLA 的任务定义

建议用时：0:55 分钟

这里先统一概念。VLA 的输出是机器人动作，可以是末端位姿变化、夹爪开合，也可以是一段关节动作序列。公式只是概括，三篇模型的具体输入并不完全相同，例如原始 OpenVLA 主要使用单张图像，而 π₀ 还使用多视角图像和机器人状态。VLA 预测的动作通常仍由底层控制器执行，因此端到端学习不意味着取消控制器。后面比较时，我会分别看输入、动作表示、训练方式和闭环执行。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)

## 03 22篇论文：按六类问题重新定位

建议用时：1:00 分钟

我将二十二篇分成六组。前四组对应原有十四篇，帮助建立模型、数据、动作与评测的基础。后两组是这次新增的八篇，直接用于检查选题是否重复。EGR没有显式以阶段为单位，这里归入阶段与训练资源组，是因为它同样按任务重要性决定训练干预。类别用于索引，不等于方法相同。详细五行笔记和原文链接可在速读页按组筛选。

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

OpenVLA 报告的代表性结果，是在二十九项任务中比 RT-2-X 的绝对成功率高十六点五个百分点。这个比较同时涉及不同的数据与组件，因此不能把提升全部归因于某个单独结构，也不能说模型越小越好。作者指出原始版本只支持单图观察，高频控制和更灵巧的双臂操作仍有困难。这里特意限定为原论文版本，后续改进可能已经补上部分问题。做选题时必须进一步检查这些后续工作。

来源（§5.1、§6）：[OpenVLA](https://arxiv.org/abs/2406.09246)

## 09 π₀：VLM 与连续动作专家

建议用时：1:10 分钟

π₀ 关注的是如何把视觉语言模型接到连续动作生成上。它以 PaliGemma 为底座，并增加处理机器人状态和动作的专门参数，也就是动作专家。输入包含多个摄像头、语言指令以及关节状态，输出是未来一段连续动作，而不是逐维预测离散编号。论文主要模型约三十三亿参数，其中动作专家约三亿。架构与数据配方共同构成方法，不能只把它概括成给语言模型接一个动作头。

来源（§III–IV，Figure 3）：[π₀](https://arxiv.org/abs/2410.24164)

## 10 Flow matching 与动作分块

建议用时：1:15 分钟

直观地说，flow matching 学习如何把随机动作逐步修正为合理的动作序列。训练时，将真实动作和噪声插值，并学习对应的修正方向。推理时，从噪声开始沿预测向量场积分，论文使用十步。动作分块使模型能够一次考虑未来多个时刻。这里还要区分动作块长度、模型重新规划频率和底层动作执行频率。π₀ 的最高五十赫兹指动作控制能力，不能直接与 RT-2 的完整策略查询频率作同口径比较。执行较长前缀对纠错的影响，是我们可以进一步测量的系统问题。

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

这两篇补充了核心模型之外的基础。OXE 的贡献不是简单把文件放在一起，而是支持研究跨机器人共享经验，并通过 RT-X 观察到正迁移。Octo 在这种数据基础上，强调策略对不同观察和动作空间的适配，采用扩散动作解码。它也提醒我们，能接受语言并不一定等于使用大型生成式 VLM。对于后续研究，数据格式一致并不保证动作含义一致，采样频率、坐标系和数据混合方式都可能影响迁移结果。

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

这三篇解释底层概念。ACT用动作分块和时间集成减少误差累积，Diffusion Policy用条件扩散建模复杂动作分布。LoRA则处理如何更新大模型参数，并不替代动作生成设计。它们可以组合，也不应该按一个跨论文成功率来排名。研究OpenVLA-OFT时，需要同时确定动作头、执行方式和参数适配位置，不能只写使用LoRA就认为实验配置完整。

来源：[ACT](https://arxiv.org/abs/2304.13705v1)、[Diffusion Policy](https://arxiv.org/abs/2303.04137v5)、[LoRA](https://arxiv.org/abs/2106.09685v2)

## 17 OpenVLA-OFT：从开放底座到高效适配

建议用时：1:00 分钟

OpenVLA-OFT不是另一个从零预训练的巨型模型，而是研究如何更有效地适配OpenVLA。主要配方包括连续动作表示、并行预测、动作分块和L1训练目标。与π₀的flow不同，这里可以直接回归动作块。它适合用作我们的实验底座，因为实现公开且控制接口较明确。但原论文的成功率依赖具体数据和协议，不能当作所有任务上都可靠的保证。多相机、本体状态和动作头也要随检查点完整恢复，不能只加载LoRA权重。

来源：[OpenVLA](https://arxiv.org/abs/2406.09246)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LoRA](https://arxiv.org/abs/2106.09685v2)

## 18 LIBERO 与 LIBERO-Plus：先统一评测口径

建议用时：1:00 分钟

LIBERO提供任务、示范和评测环境，原始研究还包括持续学习与知识迁移。后续VLA常使用其闭环成功率，因此要写清采用哪种协议。LIBERO-Plus进一步诊断分布偏移下的鲁棒性。首轮不必复现所有扰动，但必须固定控制参数，报告干净和受扰表现。若以已在LIBERO上适配的OFT检查点继续训练，研究的是鲁棒再适配，不应包装成未见任务少样本学习。

来源：[LIBERO](https://arxiv.org/abs/2306.03310v2)、[LIBERO-Plus](https://arxiv.org/abs/2510.13626v3)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)

## 19 最接近候选课题的四篇：重叠在哪里

建议用时：1:20 分钟

这是选题判断最重要的一页。Long-VLA直接采用阶段感知输入遮蔽，是最近的输入干预工作。EGR按每帧每传感器的任务证据门控一致性约束，与先诊断再训练的思路接近。FrameSkip强调关键帧和夹爪转换，PHASER强调持续学习中的阶段资源分配。因此我不能再把阶段意识本身作为创新点。但这些工作也不等于证明我们设想的模糊增强已被完整实现，还需要对照全文、任务和成本，确认真正的差别。

来源：[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)、[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)

## 20 Long-VLA 与 EGR：先精读这两篇

建议用时：1:00 分钟

我会先读Long-VLA和EGR，而不是直接租卡训练。前者要核对移动与交互阶段的具体定义、遮蔽位置和推理依赖。后者要核对任务相关性证据是否需要额外模型或多次前向，以及两个正则项如何计算。只有知道它们已有方法的实际成本和局限，才可能提出一个有价值的简化。如果现有方法已经能解决同一个问题，而且成本并不高，就不应只把遮蔽换成模糊后继续原题。

来源：[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)

## 21 FrameSkip 与 PHASER：资源分配已有先例

建议用时：1:00 分钟

这两篇与我们的干预形式不同，但都会改变有限训练资源在时间上的分配。FrameSkip选择重要帧，PHASER针对持续学习回放。后者的遗忘问题不能直接等同于一次鲁棒微调。不过，它们说明夹爪事件、关键阶段与预算分配已经不是空白。我们的对照除了均匀增强，还需要简单事件规则。把训练步数和增强次数匹配，是为了让结论可解释，不能把实验公平性本身写成新的算法贡献。

来源：[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)

## 22 四篇补充：排除鲁棒性提升的其他解释

建议用时：1:00 分钟

除了最接近的四篇，我补充了四项鲁棒性工作。STRONG-VLA已经研究扰动训练和干净性能恢复。MAIL-Bench在任务不同阶段中断相机，说明阶段故障诊断也已有先例。View Collapse提醒我们，某相机受扰后更稳定，可能只是策略改为依赖腕部相机。CARE则表明动作块执行长度本身影响短时扰动后果。因此如果后面看到成功率提升，需要用相机干预和固定执行参数排除这些解释。

来源：[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)、[MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1)、[View Collapse](https://arxiv.org/abs/2609.33707v1)、[CARE](https://arxiv.org/abs/2609.32550v1)

## 23 阶段定向视觉增强：暂缓作为正式创新点

建议用时：1:00 分钟

这轮检索后，我会把阶段定向视觉增强从优先发表题目降为待验证候选。它仍可帮助学习数据加载、微调与鲁棒评测，但不该预先承诺创新。下一步应找出前人方法在某个具体条件下的不足，例如证据估计成本或阶段标签依赖，并检验一个更简单的解决办法。这些也只是待验证问题。如果全文核对后没有清楚差异，就换题，而不是靠更换骨干、扰动名字和数据集维持同一个题目。

来源：[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)、[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)、[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)

## 24 若找到差异，再做小规模闭环验证

建议用时：1:00 分钟

如果全文比较找到清楚的差异，实验才进入最小验证。先在两个开发任务上跑通OFT，确认检查点、动作头、状态和评测协议完整。然后诊断干净与模糊失败，固定相机和执行长度。对照至少包含无额外增强、均匀增强和固定事件规则。只有候选方法稳定优于简单规则，且没有明显损害干净性能，才增加任务和种子。小样本开发结果只用于决定是否投入，不作为正式有效性证据。

来源：[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LIBERO](https://arxiv.org/abs/2306.03310v2)、[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)、[View Collapse](https://arxiv.org/abs/2609.33707v1)、[CARE](https://arxiv.org/abs/2609.32550v1)

## 25 接下来四周：先核查，再决定是否训练

建议用时：1:00 分钟

我的计划先花两周减少重复研究风险。第一周精读最近的两篇，第二周补全预算与诊断相关工作，给出一页明确的差异矩阵。如果没有实质差异，就在这里换题。只有通过这一步，第三周才投入云GPU搭建OFT，第四周完成最小对照。目前还没有新的闭环结果，也不承诺某种方法一定能发表。希望老师先帮助判断问题是否值得做，再决定实验投入和投稿目标。

来源：[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)、[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LIBERO](https://arxiv.org/abs/2306.03310v2)

## 26 参考文献 01–04

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)、[Open X-Embodiment](https://arxiv.org/abs/2310.08864)

## 27 参考文献 05–08

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[Octo](https://arxiv.org/abs/2405.12213)、[FAST](https://arxiv.org/abs/2501.09747)、[π₀.₅](https://arxiv.org/abs/2504.16054)、[SmolVLA](https://arxiv.org/abs/2506.01844)

## 28 参考文献 09–12

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LIBERO](https://arxiv.org/abs/2306.03310v2)、[LIBERO-Plus](https://arxiv.org/abs/2510.13626v3)、[ACT](https://arxiv.org/abs/2304.13705v1)

## 29 参考文献 13–16

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[Diffusion Policy](https://arxiv.org/abs/2303.04137v5)、[LoRA](https://arxiv.org/abs/2106.09685v2)、[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)

## 30 参考文献 17–20

建议用时：按需

本页提供论文的完整标题、作者、首次预印本年份和原文链接。十四篇原阅读包的固定版本和图表页码保留在速读手册中，新增八篇标明摘要级核对。请将预印本身份与正式会议接收分开理解；这里没有把所有新增论文都标成已发表会议论文。需要讨论具体方法时，可以从原文链接继续核对。

来源：[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)、[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)、[MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1)

## 31 参考文献 21–22

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

图像来源见 assets/sources.json。原图与论文版权归原作者所有。研究方案为讨论建议，未包含新实验结果。
