# VLA Literature: Models, Methods and Evaluation

22 papers · Six themes · Methods and capability boundaries

28 slides; about 22 minutes plus 6 reference slides. The 8 additions are abstract-level checks; full texts remain to be verified.

## 01 Vision-Language-Action Models

Suggested time: 0:40 min

This report organizes twenty-two VLA and related papers into six themes: generalist policies, data foundations, actions and adaptation, evaluation, phases and training resources, and robustness diagnostics. RT-2, OpenVLA and π₀ are the main examples. OpenVLA-OFT and the related phase and robustness papers provide additional context. The emphasis is on what each paper addresses, its method, supporting evidence and limitations. The eight additions are based on original abstracts; detailed methods and experiments remain to be checked against the full texts. No new experimental results are presented.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA](https://arxiv.org/abs/2406.09246), [π₀](https://arxiv.org/abs/2410.24164)

## 02 What does a VLA policy predict?

Suggested time: 0:55 min

The output of a VLA is a robot action: for example, an end-effector displacement, a gripper command, or a sequence of joint actions. This equation summarizes the task rather than specifying identical inputs for every model. Original OpenVLA mainly uses a single image, while π₀ also uses multiple views and robot state. A low-level controller usually executes the predicted action. End-to-end learning therefore does not imply removing that controller. I compare the models through inputs, action representations, training objectives and closed-loop execution.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA](https://arxiv.org/abs/2406.09246), [π₀](https://arxiv.org/abs/2410.24164)

## 03 22 papers organized around six questions

Suggested time: 1:00 min

The first four groups establish the distinction between policies, data, action generation and evaluation. The last two groups introduce phase-related training methods and robustness diagnostics. EGR uses per-frame, per-sensor task evidence rather than the same explicit phase labels as Long-VLA. These categories are a reading index, not a claim that the methods are equivalent. The companion handbook provides five-line notes, fixed source versions and original links for each paper. Comparisons distinguish the methods’ objectives and evaluation settings.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2), [LIBERO](https://arxiv.org/abs/2306.03310v2), [Long-VLA](https://arxiv.org/abs/2508.19958v2), [STRONG-VLA](https://arxiv.org/abs/2604.10055v3)

## 04 RT-2: actions become model output tokens

Suggested time: 1:10 min

RT-2 connects language tasks and robot control through a shared output-token space. It uses PaLI-X or PaLM-E and encodes quantities such as position changes, rotation changes and gripper state as discrete symbols; the action format also includes a termination signal. Training mixes robot demonstrations with web tasks such as visual question answering. Action prediction can therefore draw on pretrained visual-language knowledge. The numbers in the figure are an action encoding, not natural-language commands sent directly to a robot. They must be decoded back into numerical control values.

Sources (§3.1–3.2; Figure 1): [RT-2](https://arxiv.org/abs/2307.15818)

## 05 RT-2: evidence and limits

Suggested time: 1:05 min

RT-2 reports roughly six thousand robot evaluation trials. Its central contribution is evidence that semantic knowledge can transfer into action selection, allowing existing skills to be reused under new symbolic or relational instructions. However, the authors explicitly note that additional web experience does not directly create new motor capabilities. The reported one-to-three-hertz rate belongs to a specific cloud-served 55B system, not to all VLA models. My reading is that semantic generalization is the strongest result, while precise control still depends on robot data and inference conditions.

Sources (§3.3; §4–5): [RT-2](https://arxiv.org/abs/2307.15818)

## 06 OpenVLA: an open research baseline

Suggested time: 1:05 min

OpenVLA continues the autoregressive discrete-action approach while emphasizing public implementation and adaptation. Its two visual encoders provide features that are combined and projected into the language model. The instruction and visual features condition a seven-dimensional action. The backbone is a Prismatic VLM using Llama 2. Compared with a closed system, this gives researchers a more accessible route to inspect components and fine-tune a policy. Public implementation does not mean that all pretraining data of every underlying component are fully transparent.

Sources (§3; Figure 2): [OpenVLA](https://arxiv.org/abs/2406.09246)

## 07 OpenVLA: training and adaptation

Suggested time: 1:00 min

The 970,000 figure refers to trajectories, not image frames, and cannot be compared directly with another paper’s number of training hours. Each action dimension still uses 256 bins, but percentile-based boundaries reduce sensitivity to outliers. The robot training loss is evaluated on action tokens. OpenVLA also studies LoRA and quantization to make adaptation and deployment more accessible. This training recipe should not be described as identical to RT-2’s co-fine-tuning on web tasks. The adaptation experiments also use particular model variants, so their details matter when interpreting the results.

Sources (§3.2–3.4; §5.3–5.4): [OpenVLA](https://arxiv.org/abs/2406.09246)

## 08 OpenVLA: results and limitations

Suggested time: 1:05 min

The headline comparison is an absolute success-rate gain of 16.5 percentage points over RT-2-X across twenty-nine tasks. Models, data and components differ, so the entire gain cannot be attributed to a single architectural choice. Nor does it imply that smaller models are always better. The original version supports a single image and remains constrained on high-frequency and dexterous control. These statements concern the original paper, not every later extension. Later work may already address part of the limitation, so the original model and its extensions must be distinguished.

Sources (§5.1; §6): [OpenVLA](https://arxiv.org/abs/2406.09246)

## 09 π₀: a VLM with a continuous-action expert

Suggested time: 1:10 min

π₀ asks how visual-language knowledge can support continuous action generation. It builds on PaliGemma and introduces specialized parameters for robot state and actions: an action expert. Multiple camera views, an instruction and robot state condition a sequence of future actions, rather than a set of discrete action IDs. The main model has about 3.3 billion parameters, including an action expert of roughly 300 million. The contribution combines architecture and data recipe; describing it merely as adding an action head misses important aspects of the method.

Sources (§III–IV; Figure 3): [π₀](https://arxiv.org/abs/2410.24164)

## 10 Flow matching and action chunking

Suggested time: 1:15 min

Intuitively, flow matching learns how to transform a random action sequence into a plausible one. During training, demonstrations are interpolated with noise and the model learns a corresponding direction of change. During inference, it starts from noise and integrates the learned field; the paper uses ten steps. Chunking jointly represents several future actions. We must distinguish prediction horizon, replanning frequency and low-level action execution frequency. The reported fifty-hertz control capability is not directly comparable with RT-2’s full-policy query rate. Executing a longer prefix also changes the opportunity to correct errors.

Sources (§IV; Equations 1–2): [π₀](https://arxiv.org/abs/2410.24164)

## 11 π₀: data recipe and capability boundaries

Suggested time: 1:05 min

π₀ distinguishes broad pretraining from task-focused post-training. Diverse robot data expands experience, while high-quality task data improves proficiency on demanding operations. Some challenging tasks depend strongly on post-training, so a folding demonstration does not establish zero-shot competence in any home. The paper leaves open the best data composition, mixture weights and data requirements for reliable transfer. Several experiments measure staged task progress rather than complete binary success. I keep those measures separate instead of calling every reported score a success rate.

Sources (§V–VII): [π₀](https://arxiv.org/abs/2410.24164)

## 12 RT-2, OpenVLA and π₀: compare design choices

Suggested time: 1:20 min

These papers illustrate distinct action representations and training recipes. RT-2 and OpenVLA emit discrete tokens, while π₀ generates continuous chunks. This is not a controlled experiment that changes only the action head: backbones, observations and datasets also differ. My interpretation is that RT-2 establishes semantic transfer, OpenVLA provides an accessible adaptation baseline, and π₀ extends continuous and dexterous control. To isolate the value of an action representation, a new experiment must hold the backbone, data and execution protocol fixed.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA](https://arxiv.org/abs/2406.09246), [π₀](https://arxiv.org/abs/2410.24164)

## 13 OXE and Octo: shared data and adaptable policies

Suggested time: 0:55 min

OXE supports shared experience across institutions and robots, rather than simply collecting files. RT-X provides evidence for positive cross-robot transfer. Octo builds a generalist policy with flexible observation and action interfaces and a diffusion decoder. It also shows that language conditioning does not necessarily imply a large generative VLM backbone. Standardized data is only a starting point: coordinate systems, sampling frequencies, action meanings and mixture weights can still change transfer outcomes.

Sources: [Open X-Embodiment](https://arxiv.org/abs/2310.08864), [Octo](https://arxiv.org/abs/2405.12213)

## 14 FAST and SmolVLA improve different bottlenecks

Suggested time: 0:55 min

Both papers discuss efficiency, but at different points in the system. FAST compresses temporal action redundancy before autoregressive learning. Its headline improvement of up to five times refers to training time, not to robot motion speed. SmolVLA combines a smaller architecture with an asynchronous system so execution need not wait for every new prediction. These improvements depend on hardware and task conditions. In particular, faster asynchronous execution need not improve the success rate of every task; the handbook records that distinction.

Sources: [FAST](https://arxiv.org/abs/2501.09747), [SmolVLA](https://arxiv.org/abs/2506.01844)

## 15 π₀.₅: operating in unseen homes

Suggested time: 0:55 min

π₀.₅ moves the evaluation beyond the laboratory. It combines heterogeneous data and tasks, including high-level semantic supervision and low-level actions, and demonstrates longer operations in new homes. The important lesson is how generalization is defined and how knowledge transfers between data sources. A new home does not automatically mean that every task or motor skill is new. An evaluation should identify which factors were observed during training and use ablations to assess the contribution of each data source.

Sources: [π₀.₅](https://arxiv.org/abs/2504.16054)

## 16 ACT, Diffusion Policy and LoRA address different layers

Suggested time: 1:00 min

ACT explains action chunking and temporal ensembling as ways to reduce compounding errors. Diffusion Policy models complex continuous-action distributions through conditional diffusion. LoRA instead changes how pretrained parameters are adapted; it is not a replacement for action-generation design. These methods can be combined and should not be placed on one cross-paper performance leaderboard. For an OFT experiment, we must specify the action head, execution mechanism and adaptation targets together. Saying that we use LoRA is not a complete training configuration.

Sources: [ACT](https://arxiv.org/abs/2304.13705v1), [Diffusion Policy](https://arxiv.org/abs/2303.04137v5), [LoRA](https://arxiv.org/abs/2106.09685v2)

## 17 OpenVLA-OFT: an efficient adaptation recipe

Suggested time: 1:00 min

OFT is a study of how to adapt OpenVLA effectively, not a new giant model trained from scratch. Its recipe combines continuous action representation, parallel prediction, chunking and an L1 objective. Unlike π₀’s flow generator, it can directly regress the action chunk. Its public implementation makes the adaptation recipe inspectable. Reported success rates still depend on data and evaluation settings. A reproducible run must restore the action head, proprioception modules, processor and statistics along with the adapted model; loading only LoRA weights is insufficient.

Sources: [OpenVLA](https://arxiv.org/abs/2406.09246), [OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2), [LoRA](https://arxiv.org/abs/2106.09685v2)

## 18 LIBERO and LIBERO-Plus: align the protocol first

Suggested time: 1:00 min

LIBERO supplies tasks, demonstrations and evaluation tools, and the original paper studies lifelong learning and knowledge transfer. Later VLA work often reports closed-loop success rates using the same environment; that protocol differs from lifelong-learning metrics. LIBERO-Plus extends diagnosis to distribution shifts. Task identities, initial states, camera configuration, corruption and executed action prefixes are all part of interpreting a result. A checkpoint already adapted to LIBERO also differs from few-shot adaptation to unseen tasks.

Sources: [LIBERO](https://arxiv.org/abs/2306.03310v2), [LIBERO-Plus](https://arxiv.org/abs/2510.13626v3), [OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)

## 19 Four papers on phases and training resources

Suggested time: 1:20 min

These papers select information or allocate training resources at different points. Long-VLA masks inputs according to phases in long-horizon tasks. EGR gates consistency objectives using relevance evidence for each frame and sensor. FrameSkip selects informative frames in the data loader. PHASER allocates historical replay across phases during continual learning. The comparison therefore distinguishes input intervention, objective design, sampling and replay, as well as their different problem settings: long-horizon control, multimodal robustness and forgetting.

Sources: [Long-VLA](https://arxiv.org/abs/2508.19958v2), [EGR](https://arxiv.org/abs/2609.03142v1), [FrameSkip](https://arxiv.org/abs/2605.13757v1), [PHASER](https://arxiv.org/abs/2606.03598v2)

## 20 Long-VLA and EGR: inputs versus objectives

Suggested time: 1:00 min

Both methods address which sensory information is useful, but they intervene differently. Long-VLA uses moving and interaction phases to organize input masking for long-horizon skill chaining. EGR gates training objectives using sensor evidence: invariance for low-evidence sensors and single-sensor sufficiency for high-evidence sensors. These are not interchangeable phase algorithms. The slide summarizes only the method positioning supported by the original abstracts. Equations, implementation details and ablations should be interpreted through the full papers.

Sources: [Long-VLA](https://arxiv.org/abs/2508.19958v2), [EGR](https://arxiv.org/abs/2609.03142v1)

## 21 FrameSkip and PHASER: sampling versus replay

Suggested time: 1:00 min

FrameSkip and PHASER both address uneven information across trajectories, but their learning settings differ. FrameSkip scores and selects frames using action variation, visual-action coherence, progress priors and gripper transitions. It operates in the data loader. PHASER addresses continual learning, distributing replay support across phases and prioritizing forgetting risk. Frame retention and sampled-example counts matter for interpreting FrameSkip, while replay capacity and task sequence matter for PHASER. Their results should therefore be read within their respective settings.

Sources: [FrameSkip](https://arxiv.org/abs/2605.13757v1), [PHASER](https://arxiv.org/abs/2606.03598v2)

## 22 Four papers on robustness and diagnostics

Suggested time: 1:00 min

These papers address robustness at different points. STRONG-VLA separates perturbation learning from clean-task realignment. MAIL-Bench evaluates camera interruptions at different task stages, and MINT combines missing-view training with selective completion. View Collapse explains that apparent robustness can reflect reliance on another camera rather than stronger perception. CARE studies executed action length under transient observation corruption. Together, the papers show why robustness results must be interpreted with their fault type, sensor dependencies, training setup and execution mechanism.

Sources: [STRONG-VLA](https://arxiv.org/abs/2604.10055v3), [MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1), [View Collapse](https://arxiv.org/abs/2609.33707v1), [CARE](https://arxiv.org/abs/2609.32550v1)

## 23 References 01–04

Suggested time: As needed

This page lists full titles, authors, initial preprint years and original-paper links. The handbook retains fixed PDF versions and figure/page references for the original fourteen papers. The eight additions are explicitly marked as abstract-level checks. A preprint is not automatically a formally accepted conference publication. Follow the original link when discussing a particular method; the source version and evaluation protocol remain part of the claim.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA](https://arxiv.org/abs/2406.09246), [π₀](https://arxiv.org/abs/2410.24164), [Open X-Embodiment](https://arxiv.org/abs/2310.08864)

## 24 References 05–08

Suggested time: As needed

This page lists full titles, authors, initial preprint years and original-paper links. The handbook retains fixed PDF versions and figure/page references for the original fourteen papers. The eight additions are explicitly marked as abstract-level checks. A preprint is not automatically a formally accepted conference publication. Follow the original link when discussing a particular method; the source version and evaluation protocol remain part of the claim.

Sources: [Octo](https://arxiv.org/abs/2405.12213), [FAST](https://arxiv.org/abs/2501.09747), [π₀.₅](https://arxiv.org/abs/2504.16054), [SmolVLA](https://arxiv.org/abs/2506.01844)

## 25 References 09–12

Suggested time: As needed

This page lists full titles, authors, initial preprint years and original-paper links. The handbook retains fixed PDF versions and figure/page references for the original fourteen papers. The eight additions are explicitly marked as abstract-level checks. A preprint is not automatically a formally accepted conference publication. Follow the original link when discussing a particular method; the source version and evaluation protocol remain part of the claim.

Sources: [OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2), [LIBERO](https://arxiv.org/abs/2306.03310v2), [LIBERO-Plus](https://arxiv.org/abs/2510.13626v3), [ACT](https://arxiv.org/abs/2304.13705v1)

## 26 References 13–16

Suggested time: As needed

This page lists full titles, authors, initial preprint years and original-paper links. The handbook retains fixed PDF versions and figure/page references for the original fourteen papers. The eight additions are explicitly marked as abstract-level checks. A preprint is not automatically a formally accepted conference publication. Follow the original link when discussing a particular method; the source version and evaluation protocol remain part of the claim.

Sources: [Diffusion Policy](https://arxiv.org/abs/2303.04137v5), [LoRA](https://arxiv.org/abs/2106.09685v2), [Long-VLA](https://arxiv.org/abs/2508.19958v2), [EGR](https://arxiv.org/abs/2609.03142v1)

## 27 References 17–20

Suggested time: As needed

This page lists full titles, authors, initial preprint years and original-paper links. The handbook retains fixed PDF versions and figure/page references for the original fourteen papers. The eight additions are explicitly marked as abstract-level checks. A preprint is not automatically a formally accepted conference publication. Follow the original link when discussing a particular method; the source version and evaluation protocol remain part of the claim.

Sources: [FrameSkip](https://arxiv.org/abs/2605.13757v1), [PHASER](https://arxiv.org/abs/2606.03598v2), [STRONG-VLA](https://arxiv.org/abs/2604.10055v3), [MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1)

## 28 References 21–22

Suggested time: As needed

This page lists full titles, authors, initial preprint years and original-paper links. The handbook retains fixed PDF versions and figure/page references for the original fourteen papers. The eight additions are explicitly marked as abstract-level checks. A preprint is not automatically a formally accepted conference publication. Follow the original link when discussing a particular method; the source version and evaluation protocol remain part of the claim.

Sources: [View Collapse](https://arxiv.org/abs/2609.33707v1), [CARE](https://arxiv.org/abs/2609.32550v1)

## Complete bibliography: 22 papers

1. Anthony Brohan et al. (2023, initial preprint). *RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control*. [Paper](https://arxiv.org/abs/2307.15818) · [Project](https://robotics-transformer2.github.io/)

2. Moo Jin Kim et al. (2024, initial preprint). *OpenVLA: An Open-Source Vision-Language-Action Model*. [Paper](https://arxiv.org/abs/2406.09246) · [Project](https://openvla.github.io/)

3. Kevin Black et al. (2024, initial preprint). *π₀: A Vision-Language-Action Flow Model for General Robot Control*. [Paper](https://arxiv.org/abs/2410.24164) · [Project](https://www.pi.website/blog/pi0)

4. Open X-Embodiment Collaboration (2023, initial preprint). *Open X-Embodiment: Robotic Learning Datasets and RT-X Models*. [Paper](https://arxiv.org/abs/2310.08864) · [Project](https://robotics-transformer-x.github.io/)

5. Octo Model Team et al. (2024, initial preprint). *Octo: An Open-Source Generalist Robot Policy*. [Paper](https://arxiv.org/abs/2405.12213) · [Project](https://octo-models.github.io/)

6. Karl Pertsch et al. (2025, initial preprint). *FAST: Efficient Action Tokenization for Vision-Language-Action Models*. [Paper](https://arxiv.org/abs/2501.09747) · [Project](https://www.pi.website/research/fast)

7. Physical Intelligence et al. (2025, initial preprint). *π₀.₅: a Vision-Language-Action Model with Open-World Generalization*. [Paper](https://arxiv.org/abs/2504.16054) · [Project](https://www.pi.website/blog/pi05)

8. Mustafa Shukor et al. (2025, initial preprint). *SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics*. [Paper](https://arxiv.org/abs/2506.01844) · [Project](https://huggingface.co/blog/smolvla)

9. Moo Jin Kim et al. (2025, initial preprint). *Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success*. [Paper](https://arxiv.org/abs/2502.19645v2)

10. Bo Liu et al. (2023, initial preprint). *LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning*. [Paper](https://arxiv.org/abs/2306.03310v2)

11. Senyu Fei et al. (2025, initial preprint). *LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action Models*. [Paper](https://arxiv.org/abs/2510.13626v3)

12. Tony Z. Zhao et al. (2023, initial preprint). *Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware*. [Paper](https://arxiv.org/abs/2304.13705v1)

13. Cheng Chi et al. (2023, initial preprint). *Diffusion Policy: Visuomotor Policy Learning via Action Diffusion*. [Paper](https://arxiv.org/abs/2303.04137v5)

14. Edward J. Hu et al. (2021, initial preprint). *LoRA: Low-Rank Adaptation of Large Language Models*. [Paper](https://arxiv.org/abs/2106.09685v2)

15. Yiguo Fan et al. (2025, initial preprint). *Long-VLA: Unleashing Long-Horizon Capability of Vision Language Action Model for Robot Manipulation*. [Paper](https://arxiv.org/abs/2508.19958v2)

16. Yue Yang et al. (2026, initial preprint). *Sensing Which Modality Matters: Evidence-Gated Regularization for Robust VLA Policies*. [Paper](https://arxiv.org/abs/2609.03142v1)

17. Bin Yu et al. (2026, initial preprint). *FrameSkip: Learning from Fewer but More Informative Frames in VLA Training*. [Paper](https://arxiv.org/abs/2605.13757v1)

18. Ziyang Chen et al. (2026, initial preprint). *PHASER: Phase-Aware and Semantic Experience Replay for Vision-Language-Action Models*. [Paper](https://arxiv.org/abs/2606.03598v2)

19. Yuhan Xie et al. (2026, initial preprint). *STRONG-VLA: Decoupled Robustness Learning for Vision-Language-Action Models under Multimodal Perturbations*. [Paper](https://arxiv.org/abs/2604.10055v3)

20. Mingle Jiang et al. (2026, initial preprint). *Learning to Act under Visual Interruptions with Vision-Language-Action Models*. [Paper](https://arxiv.org/abs/2609.35003v1)

21. Futa Waseda et al. (2026, initial preprint). *Does Adversarial Training Improve Generalization in Multi-View VLAs? Revealing and Mitigating View Collapse*. [Paper](https://arxiv.org/abs/2609.33707v1)

22. Shojiro Yamabe and Jun Sakuma (2026, initial preprint). *Are Vision-Language-Action Models Robust to One-Step Observation Perturbations?*. [Paper](https://arxiv.org/abs/2609.32550v1)

Figure sources: ../assets/sources.json. Papers and figures belong to the original authors. This material presents literature notes and method comparisons, not new experimental results.
