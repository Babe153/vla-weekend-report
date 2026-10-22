# VLA论文怎么读：模型、动作与测试

22篇论文 · 具体做了什么 · 结果说明了什么

共 28 页，主讲约 22 分钟。最后6页为参考资料。新增8篇只核对了摘要，全文细节待核对。

## 01 VLA：视觉语言动作模型

建议用时：0:40 分钟

老师好，我整理了二十二篇论文，主要讲三件事：机器人怎样听懂要求，怎样算出动作，以及论文怎样证明方法有用。重点是RT-2、OpenVLA和π₀，其余论文补充数据、训练办法和测试。原来十四篇保留了对应图表和页码。新增八篇目前只核对了摘要，详细实现和实验设置还没有逐项核对。这里介绍的是论文里的结果，没有我自己做的新实验。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)

## 02 VLA要做什么？

建议用时：0:55 分钟

可以把VLA理解成一个根据画面和要求决定动作的模型。它输出的不是一句操作说明，而是机器人能执行的数字，例如手臂往哪个方向移动多少、夹爪什么时候合上。关节角度等机器人自身的信息叫机器人状态，有的论文也称本体感知。原版OpenVLA主要看一张图，π₀还会看多个摄像头和机器人状态。模型算出动作以后，仍由底层控制器驱动电机。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)

## 03 22篇论文，分别在解决什么问题？

建议用时：1:00 分钟

先把论文分开看，比较容易理解。A组研究能做多种任务的机器人模型，B组整理训练数据。C组有的改动作的计算方式，有的减少继续训练的成本。D组提供测试任务。E组研究训练时该重点看哪些信息，F组研究输入出问题后的表现。它们解决的问题不同，不能把所有论文放在一起只比成功率。新增八篇目前只核对摘要，不能当作已经完整读过。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LIBERO](https://arxiv.org/abs/2306.03310v2)、[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)

## 04 RT-2：用模型会读写的编号表示动作

建议用时：1:10 分钟

语言模型本来会一个接一个地输出文字。RT-2借用这种输出方式，让编号代表机器人动作。比如一个编号对应某一档移动距离，另外的编号对应转动、夹爪和停止。训练时，模型一边学习机器人示范，一边继续学习看图回答问题。这样它以前从图片和文字中学到的知识，就有机会帮助它选择动作。执行前，这些编号还要换回真正的动作数值。动作编号这件事此前RT-1已经做过，RT-2的重点是用上已有视觉语言模型的知识。

来源（§3.1–3.2，Figure 1）：[RT-2](https://arxiv.org/abs/2307.15818)

## 05 RT-2：能听懂更多要求，仍需要已有操作技能

建议用时：1:05 分钟

RT-2的主要结果是：面对新的物体、符号或关系要求，机器人更会选择已经学过的动作。但作者也说，网上的图片和文字没有直接教会机器人全新的运动技能。另一个问题是速度。论文里55B的大模型通过云端服务，每秒大约计算一到三次新动作。这里说的是模型重新做决定的频率，不是电机运动的频率，也不是所有VLA都只能达到这个速度。

来源（§3.3、§4–5）：[RT-2](https://arxiv.org/abs/2307.15818)

## 06 OpenVLA：公开模型，让别人也能接着训练

建议用时：1:05 分钟

OpenVLA也用动作编号控制机器人。它先用DINOv2和SigLIP两套网络从图像提取信息，把结果合在一起，交给基于Llama 2的模型，再结合指令输出动作编号。它重要的地方是公开了权重和代码。研究者不用从头训练整套系统，就能检查实现或继续训练。这里的公开不代表它所用的每个基础模型都公开了全部训练数据。

来源（§3，Figure 2）：[OpenVLA](https://arxiv.org/abs/2406.09246)

## 07 OpenVLA怎样学会新机器人的动作？

建议用时：1:00 分钟

这里的九十七万条是完整操作示范，不是九十七万张图片。OpenVLA把每个动作数值分成二百五十六档，训练模型输出正确编号。分档范围取训练数据中间的大部分数值，避免少数极端值把档位拉得太宽。要让模型用于另一个机器人，可以拿那个机器人的示范继续训练，这就叫微调。LoRA减少要更新的参数；量化减少存放数字的位数，主要用来节省运行模型时的显存。这两件事解决的问题不同。

来源（§3.2–3.4、§5.3–5.4）：[OpenVLA](https://arxiv.org/abs/2406.09246)

## 08 OpenVLA的成绩好在哪里，限制又在哪里？

建议用时：1:05 分钟

十六点五是绝对百分点。例如从50%到66.5%才是提高16.5个百分点，不是相对提高16.5%。论文比较时，模型、数据和训练设置都不完全相同，因此不能把成绩全部归功于某一个结构。原版主要看单张图，动作编号又要一个接一个算，这限制了需要快速反应的操作。后来的版本可能补上部分限制，阅读时要分清版本。

来源（§5.1、§6）：[OpenVLA](https://arxiv.org/abs/2406.09246)

## 09 π₀：一次算出后面一段动作

建议用时：1:10 分钟

π₀把原本会读图和文字的模型，与专门计算动作的网络连在一起。后者在论文里叫动作专家。它直接输出移动或关节位置等数字，并一次考虑后面一段动作。这段预测就叫动作块。它还会使用多个摄像头和机器人自身状态。整套模型约三十三亿参数，专门计算动作的部分约三亿参数。一次预测五十步，不代表一定先把五十步全部做完才重新看画面。

来源（§III–IV，Figure 3）：[π₀](https://arxiv.org/abs/2410.24164)

## 10 π₀怎样把随机数字改成可用动作？

建议用时：1:15 分钟

可以把这里理解成反复修改一份动作草稿。训练时，模型看过正确动作，也看过把正确动作加上随机数字后的样子，学习应该往哪里改。真正使用时，它从随机数字开始，按学到的修改方向更新，论文使用十次更新。这里的草稿只是计算里的数字，不会先拿去让机器人乱动。预测多少步、计算时修改多少次、机器人每秒执行多少步，必须分别看。

来源（§IV，公式 1–2）：[π₀](https://arxiv.org/abs/2410.24164)

## 11 π₀怎样从“会一些”练到“做得熟”？

建议用时：1:05 分钟

π₀先用多种机器人的数据练很多操作，再用高质量数据专门练具体任务。论文称前一步为预训练，后一步为后训练。一些复杂任务很依赖后面的专门训练，所以看到它折衣服，不能理解成它到任意家庭都不用再练。论文也没有完全回答每类数据该放多少，以及怎样才能稳定成功。部分实验给做成一部分的任务也计分，要和完整完成的比例分开。

来源（§V–VII）：[π₀](https://arxiv.org/abs/2410.24164)

## 12 三篇论文，算动作的方式有什么不同？

建议用时：1:20 分钟

最容易记的区别是动作怎么输出。RT-2和OpenVLA一个接一个给出动作编号，π₀一起修改一段动作数字。RT-2展示了图文知识能帮助选动作，OpenVLA把模型公开，π₀更重视连续多步操作。不过它们的基础模型、输入和训练数据也不一样，所以不能说结果差异全是动作输出方式造成的。这张表帮助理解设计，不是性能排行榜。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)

## 13 OXE把数据放在一起，Octo用这些数据学动作

建议用时：0:55 分钟

OXE主要解决数据分散的问题，把多个机构的机器人示范整理成可共同使用的格式。RT-X再检查，别的机器人做过的操作能否帮助目标机器人。Octo使用这类数据训练，并允许更换输入或输出部分，再拿新机器人的示范继续练。它可以根据语言或目标图片选动作。即便文件格式一致，不同机器人移动一单位、不同坐标方向和不同记录频率仍可能有不同含义。

来源：[Open X-Embodiment](https://arxiv.org/abs/2310.08864)、[Octo](https://arxiv.org/abs/2405.12213)

## 14 FAST少预测编号，SmolVLA减少等待

建议用时：0:55 分钟

FAST解决的是动作要用多少编号记录。连续运动的相邻时刻经常很相似，逐个时刻写下每个数会产生很长的编号串。FAST先把整段动作变化写成多条快慢不同的起伏曲线相加，记录每条曲线占多少，这一步叫DCT；再调整精度并取整，用短编号代替常见的数字组合，这一步叫BPE。这样模型需要预测的编号更少。执行前再把编号还原成动作；压缩精度也会影响还原误差。SmolVLA则减少模型规模，并让预测下一段与执行当前段同时进行。两篇节省的时间发生在不同地方。

来源：[FAST](https://arxiv.org/abs/2501.09747)、[SmolVLA](https://arxiv.org/abs/2506.01844)

## 15 π₀.₅：到没训练过的家庭里整理东西

建议用时：0:55 分钟

π₀.₅不仅计算手臂动作，也会判断当前应做哪个小步骤。训练时，它同时使用机器人示范、网络图片文字、物体位置和任务步骤等资料。论文测试它到了未用于训练的家庭后，能否完成整理任务。这里的“新”主要说环境，不能自动理解成所有物体、指令和动作都没见过。还要看移除哪类训练资料会让成绩下降，而且不是每一种资料都在每项测试里同样重要。

来源：[π₀.₅](https://arxiv.org/abs/2504.16054)

## 16 三个常见办法：多算几步、反复修改、少改参数

建议用时：1:00 分钟

ACT一次预测多个时刻的动作。前后几次预测可能覆盖同一时刻，它把这些结果加权平均，让动作更连贯。训练中还用CVAE记录示范之间不同的做法。Diffusion Policy从随机数字开始，结合画面反复修改，得到一段可执行动作。LoRA不规定怎样算动作，它只改变训练时更新哪些参数。这三篇处理的问题不同，可以放在一套系统里同时使用。

来源：[ACT](https://arxiv.org/abs/2304.13705v1)、[Diffusion Policy](https://arxiv.org/abs/2303.04137v5)、[LoRA](https://arxiv.org/abs/2106.09685v2)

## 17 OpenVLA-OFT：一次直接算出后面8步

建议用时：1:00 分钟

OFT是在已有OpenVLA上继续训练的一套办法。原版一个接一个预测动作编号，OFT可以一次直接输出未来多步的动作数值。训练用L1误差，也就是把预测值与示范值的差取绝对值，再合起来计算。它不需要像π₀那样从随机数字反复修改。不过，当同一个画面有几种合理做法时，直接预测一组数值仍有局限。原论文里的速度和成功率，都要连同数据、输入和执行设置一起理解。

来源：[OpenVLA](https://arxiv.org/abs/2406.09246)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LoRA](https://arxiv.org/abs/2106.09685v2)

## 18 LIBERO提供任务，LIBERO-Plus把测试条件改难

建议用时：1:00 分钟

LIBERO是一套仿真任务、示范和测试工具。原论文还研究学会新任务后，是否忘掉旧任务。后来的VLA论文常用它测试整项任务做成的比例。LIBERO-Plus在原任务上改变物体布局、拍摄角度、光照等，检查条件变了以后还能不能做成。理解成绩时，要看机器人从哪里开始、输入改了什么、一次做几步才重新看。只看一个百分数，不知道这些条件，就容易比较错。

来源：[LIBERO](https://arxiv.org/abs/2306.03310v2)、[LIBERO-Plus](https://arxiv.org/abs/2510.13626v3)、[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)

## 19 这四篇在训练时，分别挑什么信息？

建议用时：1:20 分钟

四篇论文改的地方不同。Long-VLA按操作阶段选择输入；EGR先估计传感器与当前任务的关系，再改变训练要求。FrameSkip选择训练时用哪些帧，也就是哪些时刻的画面和动作。PHASER则在学新任务时重新练旧示范，特别照顾容易忘掉的步骤。所以它们都在挑信息，但有的挑输入，有的改训练要求，有的挑新示范，有的挑旧示范，不能当成同一个算法。

来源：[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)、[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)

## 20 Long-VLA看操作阶段，EGR看传感器有没有用

建议用时：1:00 分钟

Long-VLA按移动和交互阶段组织输入。它想让前一个操作做完以后，下一个操作更容易接上。EGR问的是另一个问题：这一刻，哪个传感器对当前任务有帮助？它用估计分数改变训练要求。无关传感器的数据变化时，模型应该尽量保持原来的动作；只剩有用传感器时，也训练它尽量完成。论文把这叫证据门控正则，但理解时先记住它具体要求模型做到什么。分数怎样算、具体公式怎样写，这里还没有逐项核对全文。

来源：[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)

## 21 FrameSkip挑训练画面，PHASER让旧步骤再练几次

建议用时：1:00 分钟

FrameSkip处理一段示范里重复画面太多的问题。机器人很久都在做差不多的动作，训练就可能反复看这些内容，却很少练到抓住或松开的短暂时刻。它根据动作、画面和任务进展选帧。PHASER处理学新忘旧的问题，重新练旧任务中的一些步骤，这叫回放。它既照顾短步骤，也优先照顾容易忘的步骤。两篇一个主要挑当前训练数据，一个安排旧数据再练。

来源：[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)

## 22 画面出问题后，这四篇分别怎么办？

建议用时：1:00 分钟

STRONG-VLA先让模型练受干扰的数据，再回到正常数据继续练，目的是照顾正常情况下的表现。MINT让模型练缺少相机画面时怎么动，并尝试补出缺失画面；补出的画面不可靠时会停用。View Collapse提醒我们，一个相机坏了还能做成，可能是模型转而依赖另一台。CARE比较前后两次动作预测，决定先做几步；少做几步就更早有机会重新观察。这些论文看起来都在提高抗干扰表现，实际改的位置不同。

来源：[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)、[MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1)、[View Collapse](https://arxiv.org/abs/2609.33707v1)、[CARE](https://arxiv.org/abs/2609.32550v1)

## 23 参考文献 01–04

建议用时：按需

这里列出论文标题、作者和原文链接。年份按第一次公开的时间计算，可能与正式会议年份不同。原来的十四篇对应固定PDF版本，笔记保留了图表和页码。新增八篇目前只核对摘要，还没有逐项检查全文和代码。预印本和正式会议录用也分开注明，避免把尚未核实的状态说成已发表。

来源：[RT-2](https://arxiv.org/abs/2307.15818)、[OpenVLA](https://arxiv.org/abs/2406.09246)、[π₀](https://arxiv.org/abs/2410.24164)、[Open X-Embodiment](https://arxiv.org/abs/2310.08864)

## 24 参考文献 05–08

建议用时：按需

这里列出论文标题、作者和原文链接。年份按第一次公开的时间计算，可能与正式会议年份不同。原来的十四篇对应固定PDF版本，笔记保留了图表和页码。新增八篇目前只核对摘要，还没有逐项检查全文和代码。预印本和正式会议录用也分开注明，避免把尚未核实的状态说成已发表。

来源：[Octo](https://arxiv.org/abs/2405.12213)、[FAST](https://arxiv.org/abs/2501.09747)、[π₀.₅](https://arxiv.org/abs/2504.16054)、[SmolVLA](https://arxiv.org/abs/2506.01844)

## 25 参考文献 09–12

建议用时：按需

这里列出论文标题、作者和原文链接。年份按第一次公开的时间计算，可能与正式会议年份不同。原来的十四篇对应固定PDF版本，笔记保留了图表和页码。新增八篇目前只核对摘要，还没有逐项检查全文和代码。预印本和正式会议录用也分开注明，避免把尚未核实的状态说成已发表。

来源：[OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)、[LIBERO](https://arxiv.org/abs/2306.03310v2)、[LIBERO-Plus](https://arxiv.org/abs/2510.13626v3)、[ACT](https://arxiv.org/abs/2304.13705v1)

## 26 参考文献 13–16

建议用时：按需

这里列出论文标题、作者和原文链接。年份按第一次公开的时间计算，可能与正式会议年份不同。原来的十四篇对应固定PDF版本，笔记保留了图表和页码。新增八篇目前只核对摘要，还没有逐项检查全文和代码。预印本和正式会议录用也分开注明，避免把尚未核实的状态说成已发表。

来源：[Diffusion Policy](https://arxiv.org/abs/2303.04137v5)、[LoRA](https://arxiv.org/abs/2106.09685v2)、[Long-VLA](https://arxiv.org/abs/2508.19958v2)、[EGR](https://arxiv.org/abs/2609.03142v1)

## 27 参考文献 17–20

建议用时：按需

这里列出论文标题、作者和原文链接。年份按第一次公开的时间计算，可能与正式会议年份不同。原来的十四篇对应固定PDF版本，笔记保留了图表和页码。新增八篇目前只核对摘要，还没有逐项检查全文和代码。预印本和正式会议录用也分开注明，避免把尚未核实的状态说成已发表。

来源：[FrameSkip](https://arxiv.org/abs/2605.13757v1)、[PHASER](https://arxiv.org/abs/2606.03598v2)、[STRONG-VLA](https://arxiv.org/abs/2604.10055v3)、[MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1)

## 28 参考文献 21–22

建议用时：按需

这里列出论文标题、作者和原文链接。年份按第一次公开的时间计算，可能与正式会议年份不同。原来的十四篇对应固定PDF版本，笔记保留了图表和页码。新增八篇目前只核对摘要，还没有逐项检查全文和代码。预印本和正式会议录用也分开注明，避免把尚未核实的状态说成已发表。

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
