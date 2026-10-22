# Understanding VLA Papers: Models, Actions and Tests

22 papers · What each method does · What the results show

28 slides; about 22 minutes plus 6 reference slides. Only the abstracts of the 8 additions have been checked; full-text details remain to be reviewed.

## 01 Vision-Language-Action Models

Suggested time: 0:40 min

This report covers twenty-two papers. I focus on three questions: how a robot uses an instruction, how it calculates its actions, and how each paper tests whether its method works. RT-2, OpenVLA and π₀ are the main examples. Other papers explain the data, training choices and tests. The original fourteen entries include figure and page references. For the eight additions, only the abstracts have been checked so far. This report presents the authors’ results, not new experiments of my own.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA](https://arxiv.org/abs/2406.09246), [π₀](https://arxiv.org/abs/2410.24164)

## 02 What does a VLA model do?

Suggested time: 0:55 min

A VLA outputs control numbers rather than a written set of instructions. Those numbers can specify a direction and distance, a rotation, or a gripper command. Some models also read the robot’s own joint angles and other measurements, called proprioception. Original OpenVLA mainly uses one image, whereas π₀ uses multiple views and robot state. A low-level controller still drives the motors after the model calculates an action.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA](https://arxiv.org/abs/2406.09246), [π₀](https://arxiv.org/abs/2410.24164)

## 03 What problem does each group address?

Suggested time: 1:00 min

These groups separate different kinds of work. Some papers build robot models, some share training data, some change action prediction or reduce training cost, and others provide tests. The last two groups examine which information matters during training and what happens when inputs go wrong. Their success rates answer different questions, so they do not form one leaderboard. The eight additions have only been checked through their abstracts.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2), [LIBERO](https://arxiv.org/abs/2306.03310v2), [Long-VLA](https://arxiv.org/abs/2508.19958v2), [STRONG-VLA](https://arxiv.org/abs/2604.10055v3)

## 04 RT-2: give robot actions token IDs

Suggested time: 1:10 min

A language model already knows how to output a sequence of symbols. RT-2 uses those symbols as action IDs. IDs describe movement, rotation, gripper state and termination. Training mixes robot demonstrations with image-and-language tasks so earlier knowledge can help action selection. The IDs are converted back to control values before execution. RT-1 already used action discretization; RT-2’s key step is using a pretrained visual-language model for this prediction.

Sources (§3.1–3.2; Figure 1): [RT-2](https://arxiv.org/abs/2307.15818)

## 05 RT-2: understand more requests, reuse learned skills

Suggested time: 1:05 min

RT-2 provides evidence that web knowledge helps the robot choose known actions for unfamiliar objects or instructions. The authors also say that this does not directly teach entirely new motor skills. Speed is another limit: the cloud-served 55B system makes about one to three policy queries per second. That measures how often the model makes a new decision, not motor speed, and it is not a limit shared by every VLA.

Sources (§3.3; §4–5): [RT-2](https://arxiv.org/abs/2307.15818)

## 06 OpenVLA: release the model so others can train it

Suggested time: 1:05 min

OpenVLA also predicts action IDs. DINOv2 and SigLIP process the image, their outputs are combined, and a Llama-2-based model uses them with the instruction to predict an action. Public weights and code let other researchers inspect the implementation and train it further without starting from scratch. Public release does not mean that all training data for every underlying component are fully disclosed.

Sources (§3; Figure 2): [OpenVLA](https://arxiv.org/abs/2406.09246)

## 07 How does OpenVLA learn another robot’s actions?

Suggested time: 1:00 min

The data count refers to trajectories, not images. Each action dimension is divided into 256 bins. The bin range uses most training values while excluding extreme tails. Further training on another robot’s demonstrations is called fine-tuning. LoRA reduces the number of updated parameters. Quantization instead stores numbers with fewer bits and can reduce memory use when running the model. They are different tools with different effects.

Sources (§3.2–3.4; §5.3–5.4): [OpenVLA](https://arxiv.org/abs/2406.09246)

## 08 Where does OpenVLA perform well, and where does it struggle?

Suggested time: 1:05 min

The result is an absolute gain of 16.5 percentage points under a particular test protocol. Models, data and training settings differ, so no single component explains the entire difference. Original OpenVLA mainly reads one image and calculates action IDs in sequence. That limits tasks needing rapid updates. Later versions may address some of these issues, so the version matters when interpreting the claim.

Sources (§5.1; §6): [OpenVLA](https://arxiv.org/abs/2406.09246)

## 09 π₀: calculate a sequence of future actions

Suggested time: 1:10 min

π₀ connects an image-and-language model to a network specialized for actions, called the action expert. It produces numerical movements and predicts several future steps together. That sequence is called an action chunk. The model also reads multiple cameras and robot state. It has about 3.3 billion parameters, including an action expert of roughly 300 million. Predicting fifty steps does not necessarily mean executing all fifty before looking again.

Sources (§III–IV; Figure 3): [π₀](https://arxiv.org/abs/2410.24164)

## 10 How does π₀ turn random numbers into useful actions?

Suggested time: 1:15 min

Think of the calculation as revising a draft action sequence. Training combines demonstrated actions with random numbers and teaches the model a direction for improving that mixture. At run time it starts from random numbers and follows learned directions for ten updates. These drafts exist only inside the computation. The robot executes the resulting actions. Prediction length, generation updates and physical execution rate are separate quantities.

Sources (§IV; Equations 1–2): [π₀](https://arxiv.org/abs/2410.24164)

## 11 π₀: learn many tasks, then practise difficult ones

Suggested time: 1:05 min

The paper first trains on varied robot data, then continues training on high-quality demonstrations of a target task. These stages are called pretraining and post-training. Some difficult tasks depend strongly on the second stage. A folding demonstration therefore does not establish untrained success in any home. Data selection and reliable completion remain open issues in the paper. Partial task-progress scores must also be kept separate from full-task success rates.

Sources (§V–VII): [π₀](https://arxiv.org/abs/2410.24164)

## 12 How do the three models calculate actions?

Suggested time: 1:20 min

The simplest distinction is the output process. RT-2 and OpenVLA emit action IDs one by one. π₀ updates a whole action sequence. RT-2 shows that image-text knowledge can help action selection; OpenVLA makes the model available for further work; π₀ emphasizes longer sequences of continuous movements. Their starting models and training data also differ, so output design alone cannot explain every performance difference.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA](https://arxiv.org/abs/2406.09246), [π₀](https://arxiv.org/abs/2410.24164)

## 13 OXE shares demonstrations; Octo learns from them

Suggested time: 0:55 min

OXE organizes demonstrations that were scattered across institutions and robots. RT-X tests whether experience from other robots helps a target robot. Octo uses this kind of data and supports changing parts that read inputs or produce actions before further training. It can use language or a goal image. Matching file formats does not automatically align coordinates, movement units or recording rates.

Sources: [Open X-Embodiment](https://arxiv.org/abs/2310.08864), [Octo](https://arxiv.org/abs/2405.12213)

## 14 FAST predicts fewer IDs; SmolVLA reduces waiting

Suggested time: 0:55 min

FAST changes how actions are recorded. Closely spaced movements are often similar, but recording every value at every time step creates a long list of IDs. DCT first rewrites the sequence as a sum of waves with different rates, recording how much of each wave is used. Scaling and rounding reduce precision, and BPE assigns short IDs to common number sequences. The model predicts fewer IDs; these are decoded back into actions. Compression settings affect reconstruction error. SmolVLA instead uses a smaller model and overlaps prediction with execution. The time savings occur in different parts of the system.

Sources: [FAST](https://arxiv.org/abs/2501.09747), [SmolVLA](https://arxiv.org/abs/2506.01844)

## 15 π₀.₅: tidy homes that were not used for training

Suggested time: 0:55 min

π₀.₅ predicts a current subtask as well as the movements needed for it. It learns from robot demonstrations, web images and text, and labels for objects and task steps. The paper tests household tasks in homes not used for training. This mainly establishes a change of environment; it does not mean every object, instruction or physical skill is unseen. Removing data sources helps identify their contribution, which varies by test.

Sources: [π₀.₅](https://arxiv.org/abs/2504.16054)

## 16 Three tools: predict ahead, revise actions, update fewer weights

Suggested time: 1:00 min

ACT predicts several future steps. Predictions made at different times can overlap, so it takes a weighted average for a shared time step. A CVAE also represents differences between demonstrations during training. Diffusion Policy repeatedly revises random numbers using the observation to produce actions. LoRA instead changes which weights are updated during training. These methods address different parts of a system and can be combined.

Sources: [ACT](https://arxiv.org/abs/2304.13705v1), [Diffusion Policy](https://arxiv.org/abs/2303.04137v5), [LoRA](https://arxiv.org/abs/2106.09685v2)

## 17 OpenVLA-OFT: directly predict the next 8 steps

Suggested time: 1:00 min

OFT is a recipe for continuing training from OpenVLA. Instead of producing action IDs in sequence, it directly outputs numerical actions for several future steps. L1 error adds up absolute differences from demonstrated values. It does not use π₀’s repeated updates from random numbers. Direct prediction still has limitations when several different actions are equally reasonable. Reported speed and success depend on the input, data and execution settings.

Sources: [OpenVLA](https://arxiv.org/abs/2406.09246), [OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2), [LoRA](https://arxiv.org/abs/2106.09685v2)

## 18 LIBERO supplies tasks; LIBERO-Plus changes the conditions

Suggested time: 1:00 min

LIBERO provides simulation tasks, demonstrations and test tools. Its original paper also studies whether learning new tasks causes forgetting. Later VLA papers often use full-task success rates. LIBERO-Plus changes conditions such as layout, camera angle and lighting. Results depend on starting states, changed inputs and how many actions are executed before another observation. A percentage without those settings is easy to misinterpret.

Sources: [LIBERO](https://arxiv.org/abs/2306.03310v2), [LIBERO-Plus](https://arxiv.org/abs/2510.13626v3), [OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2)

## 19 What information do these four methods focus on?

Suggested time: 1:20 min

Long-VLA selects inputs according to manipulation phases. EGR estimates how useful a sensor is for the task and changes training requirements accordingly. FrameSkip selects which recorded frames and actions enter training. PHASER revisits old demonstrations during new-task learning, with attention to steps at risk of being forgotten. They all select information, but at different points and for different purposes.

Sources: [Long-VLA](https://arxiv.org/abs/2508.19958v2), [EGR](https://arxiv.org/abs/2609.03142v1), [FrameSkip](https://arxiv.org/abs/2605.13757v1), [PHASER](https://arxiv.org/abs/2606.03598v2)

## 20 Long-VLA uses task phases; EGR checks sensor usefulness

Suggested time: 1:00 min

Long-VLA organizes inputs around moving and interaction phases to help connect operations. EGR asks which sensor helps the current task at this moment. Scores determine the training requirements: avoid changing actions because an irrelevant sensor changed, and practise acting with useful sensor information alone. The paper calls this evidence-gated regularization. The practical requirements explain the idea; the exact score calculation and equations have not been checked here.

Sources: [Long-VLA](https://arxiv.org/abs/2508.19958v2), [EGR](https://arxiv.org/abs/2609.03142v1)

## 21 FrameSkip selects frames; PHASER practises old steps again

Suggested time: 1:00 min

FrameSkip reduces the dominance of repetitive parts of demonstrations. Long stretches of similar motion can receive more training than brief grasp or release moments. The method uses actions, image changes and progress to select frames. PHASER addresses forgetting during new learning by revisiting old demonstrations, called replay. It supports brief steps and prioritizes those at risk of being forgotten. One selects current training moments; the other schedules practice of older ones.

Sources: [FrameSkip](https://arxiv.org/abs/2605.13757v1), [PHASER](https://arxiv.org/abs/2606.03598v2)

## 22 What happens when camera input goes wrong?

Suggested time: 1:00 min

STRONG-VLA trains on increasingly difficult disturbed inputs, then returns to normal data to preserve ordinary task performance. MINT practises acting without some camera views and tries to supply predicted images, withdrawing them when unreliable. View Collapse shows that success with one damaged camera can reflect reliance on another. CARE compares consecutive action predictions to select how many steps to execute before looking again. Similar goals do not mean the methods change the same part of the system.

Sources: [STRONG-VLA](https://arxiv.org/abs/2604.10055v3), [MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1), [View Collapse](https://arxiv.org/abs/2609.33707v1), [CARE](https://arxiv.org/abs/2609.32550v1)

## 23 References 01–04

Suggested time: As needed

These entries provide titles, authors and original links. Years refer to initial public release and can differ from conference years. The original fourteen notes use fixed PDF versions with figure and page references. The eight additions have only been checked through their abstracts; full texts and code have not been reviewed in detail. Preprints and confirmed conference acceptance are listed separately.

Sources: [RT-2](https://arxiv.org/abs/2307.15818), [OpenVLA](https://arxiv.org/abs/2406.09246), [π₀](https://arxiv.org/abs/2410.24164), [Open X-Embodiment](https://arxiv.org/abs/2310.08864)

## 24 References 05–08

Suggested time: As needed

These entries provide titles, authors and original links. Years refer to initial public release and can differ from conference years. The original fourteen notes use fixed PDF versions with figure and page references. The eight additions have only been checked through their abstracts; full texts and code have not been reviewed in detail. Preprints and confirmed conference acceptance are listed separately.

Sources: [Octo](https://arxiv.org/abs/2405.12213), [FAST](https://arxiv.org/abs/2501.09747), [π₀.₅](https://arxiv.org/abs/2504.16054), [SmolVLA](https://arxiv.org/abs/2506.01844)

## 25 References 09–12

Suggested time: As needed

These entries provide titles, authors and original links. Years refer to initial public release and can differ from conference years. The original fourteen notes use fixed PDF versions with figure and page references. The eight additions have only been checked through their abstracts; full texts and code have not been reviewed in detail. Preprints and confirmed conference acceptance are listed separately.

Sources: [OpenVLA-OFT](https://arxiv.org/abs/2502.19645v2), [LIBERO](https://arxiv.org/abs/2306.03310v2), [LIBERO-Plus](https://arxiv.org/abs/2510.13626v3), [ACT](https://arxiv.org/abs/2304.13705v1)

## 26 References 13–16

Suggested time: As needed

These entries provide titles, authors and original links. Years refer to initial public release and can differ from conference years. The original fourteen notes use fixed PDF versions with figure and page references. The eight additions have only been checked through their abstracts; full texts and code have not been reviewed in detail. Preprints and confirmed conference acceptance are listed separately.

Sources: [Diffusion Policy](https://arxiv.org/abs/2303.04137v5), [LoRA](https://arxiv.org/abs/2106.09685v2), [Long-VLA](https://arxiv.org/abs/2508.19958v2), [EGR](https://arxiv.org/abs/2609.03142v1)

## 27 References 17–20

Suggested time: As needed

These entries provide titles, authors and original links. Years refer to initial public release and can differ from conference years. The original fourteen notes use fixed PDF versions with figure and page references. The eight additions have only been checked through their abstracts; full texts and code have not been reviewed in detail. Preprints and confirmed conference acceptance are listed separately.

Sources: [FrameSkip](https://arxiv.org/abs/2605.13757v1), [PHASER](https://arxiv.org/abs/2606.03598v2), [STRONG-VLA](https://arxiv.org/abs/2604.10055v3), [MAIL-Bench / MINT](https://arxiv.org/abs/2609.35003v1)

## 28 References 21–22

Suggested time: As needed

These entries provide titles, authors and original links. Years refer to initial public release and can differ from conference years. The original fourteen notes use fixed PDF versions with figure and page references. The eight additions have only been checked through their abstracts; full texts and code have not been reviewed in detail. Preprints and confirmed conference acceptance are listed separately.

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
