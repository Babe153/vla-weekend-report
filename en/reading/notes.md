# 22 VLA Papers: Five-Line Notes, Topic Map and Method Comparison

Updated 22 October 2026. The original 14 entries retain fixed PDF versions and figure/page references. The 8 additions are based on original abstracts; full texts and code have not yet been checked. Page numbers count from page 1 in a PDF reader.

Start with the theme map, read the five-line notes, then verify the evidence in the paper. Do not rank success rates across different data, models or protocols. IDs 01–14 match the original reading package; 15–22 are additions.

## 1. Six themes and a reading route

| Theme | Papers | Core question |
| --- | --- | --- |
| A · Generalist policies · 6 | RT-2, OpenVLA, π₀, Octo, π₀.₅, SmolVLA | How does visual-language knowledge support actions? |
| B · Data foundations · 1 | Open X-Embodiment / RT-X | Can experience transfer across robots? |
| C · Actions and adaptation · 5 | ACT, Diffusion Policy, FAST, OpenVLA-OFT, LoRA | How are actions generated and parameters adapted? |
| D · Evaluation · 2 | LIBERO, LIBERO-Plus | How are success and robustness measured? |
| E · Phases and training resources · 4 | Long-VLA, EGR, FrameSkip, PHASER | When and where should training intervene? |
| F · Robustness and diagnostics · 4 | STRONG-VLA, MAIL-Bench / MINT, View Collapse, CARE | What causes failures and apparent gains? |

**Advisor-report route:** RT-2 → OpenVLA → π₀ → OFT → evaluation → phase-related methods and robustness diagnostics. Entries 01–14 cover foundations; 15–22 cover phases and robustness. Explain mechanisms and distinctions rather than reciting every detail.

**Phase and robustness reading route:** Long-VLA (15) → EGR (16) → FrameSkip (17) → PHASER (18) → View Collapse (21) → STRONG-VLA (19). MAIL-Bench / MINT (20) and CARE (22) add fault and execution perspectives.

**Category boundaries:** EGR gates sensor evidence, FrameSkip selects frames, and PHASER addresses continual learning. Grouping them supports comparison of relevance and resource allocation; it does not imply shared phase labels. MAIL-Bench includes both a benchmark and a method and is indexed under robustness diagnostics.

## 2. Cross-paper comparison

| Paper | Main role / question | Data and knowledge | Action representation / output | Relationship |
| --- | --- | --- | --- | --- |
| [01 RT-2](#paper-01) | Generalist policy | Web image-text and robot demonstrations | Dimension-wise discrete tokens; autoregressive; one action | Read with OpenVLA for semantic knowledge transfer into control. |
| [02 OpenVLA](#paper-02) | Generalist policy | OXE and other robot demonstrations | Dimension-wise discrete tokens; autoregressive; one action | Shares token-based control with RT-2; OFT modifies its adaptation recipe. |
| [03 π₀](#paper-03) | Generalist policy | Proprietary multi-robot and public robot data | Continuous chunks; iterative flow matching | Contrasts with discrete RT-2/OpenVLA; provides a foundation for π₀.₅. |
| [04 Open X-Embodiment / RT-X](#paper-04) | Data and cross-robot transfer | Demonstrations across institutions and robots | Standardized data; RT-X policies emit discrete actions | A data foundation for Octo and OpenVLA, not another action-generation algorithm. |
| [05 Octo](#paper-05) | Generalist policy | Filtered and weighted OXE demonstrations | Continuous chunks; conditional diffusion head | Compare its generalist architecture with OpenVLA and its generator with Diffusion Policy. |
| [06 FAST](#paper-06) | Action representation | Action sequences for the tokenizer; demonstrations for the policy | Compressed discrete action chunks; autoregressive policy | Contrasts with dimension-wise bins; used in π₀.₅ pretraining. |
| [07 π₀.₅](#paper-07) | Generalist policy | Multi-robot data, semantic labels and web image-text | FAST pretraining; flow action chunks after post-training | Extends π₀ using FAST and heterogeneous knowledge transfer. |
| [08 SmolVLA](#paper-08) | Generalist policy | Mainly community SO100 data, then target adaptation | Continuous flow chunks; optional asynchronous execution | Relates to π₀’s action expert; compare model, data and execution costs. |
| [09 OpenVLA-OFT](#paper-09) | Action modeling and adaptation | Pretrained OpenVLA and downstream demonstrations | Continuous chunks; parallel prediction; L1 regression | An adaptation recipe built on OpenVLA; compare with diffusion/flow generators. |
| [10 LIBERO](#paper-10) | Task evaluation benchmark | Simulation tasks, demonstrations and initial states | Evaluation protocols; no single prescribed policy | Used by OFT; LIBERO-Plus extends robustness evaluation. |
| [11 LIBERO-Plus](#paper-11) | Robustness evaluation benchmark | Perturbed LIBERO tasks and associated training resources | Controlled shifts and diagnostics; no single prescribed policy | Tests the gap between benchmark success and reliability. |
| [12 ACT](#paper-12) | Imitation-learning policy | Task-specific teleoperated demonstrations | Continuous CVAE chunks; temporal ensembling | A foundation for chunking; compare with Diffusion Policy. |
| [13 Diffusion Policy](#paper-13) | Imitation-learning policy | Task-specific robot demonstrations | Conditional diffusion sequences; receding-horizon execution | Connects to Octo; contrasts with π₀ flow and OFT direct regression. |
| [14 LoRA](#paper-14) | Parameter adaptation tool | Pretrained models and target data; original tests mainly NLP | Low-rank weight updates; does not prescribe actions | Can adapt OpenVLA/OFT; separate from tokenizers and action heads. |
| [15 Long-VLA](#paper-15) | Phases and training resources | Robot demonstrations / task observations; see paper | Phase-aware input masking; L-CALVIN evaluation | Phase-based inputs differ from EGR objective gating and FrameSkip selection. |
| [16 EGR](#paper-16) | Phases and training resources | Robot demonstrations / task observations; see paper | Evidence-gated invariance and sufficiency objectives | Sensor-evidence-gated objectives differ from explicit moving/interaction masking. |
| [17 FrameSkip](#paper-17) | Phases and training resources | Robot demonstrations / task observations; see paper | Data-loader frame selection and remapping | Data-loader selection differs from PHASER’s continual-learning replay. |
| [18 PHASER](#paper-18) | Phases and training resources | Robot demonstrations / task observations; see paper | Phase-balanced replay and forgetting-risk routing | Phase replay addresses continual forgetting rather than one-stage frame selection. |
| [19 STRONG-VLA](#paper-19) | Robustness and diagnostics | Robot demonstrations / task observations; see paper | Perturbation curriculum followed by clean realignment | Training curricula and clean realignment differ from inference-time interventions. |
| [20 MAIL-Bench / MINT](#paper-20) | Robustness and diagnostics | Robot demonstrations / task observations; see paper | Stage-wise camera-loss evaluation; missing-view training and completion | Combines camera-loss evaluation and missing-view handling; distinct from transient corruption. |
| [21 View Collapse](#paper-21) | Robustness and diagnostics | Robot demonstrations / task observations; see paper | Controlled view interventions and View Swap | Separates robust perception from changed multi-view reliance through controlled interventions. |
| [22 CARE](#paper-22) | Robustness and diagnostics | Robot demonstrations / task observations; see paper | Consistency-based dynamic action execution prefix | Adjusts action execution prefixes; distinct from training augmentation. |

## 3. Connections between foundational models and related methods

1. **Semantics and actions: RT-2 → OpenVLA.** Both use discrete action tokens. This is a methodological link, not direct inheritance of RT-2 weights.
2. **Continuous generation: Diffusion Policy, Octo and π₀.** The first two use diffusion; π₀ uses flow matching. Their inputs, datasets and objectives differ.
3. **Open adaptation: OpenVLA → OFT, with LoRA.** OFT changes representation, decoding and objectives; LoRA changes parameter updates.
4. **Efficiency and generalization: ACT, FAST, SmolVLA and π₀.₅.** Chunking, compression, scale, asynchronous execution and heterogeneous data address different bottlenecks.
5. **Foundations and evaluation: OXE, LIBERO and LIBERO-Plus.** Separate shared data, task evaluation and robustness diagnosis.
6. **Phases and relevance: Long-VLA, EGR, FrameSkip and PHASER.** Phase-aware inputs, evidence-gated training and critical-event allocation have precedents.
7. **Robustness mechanisms: STRONG-VLA, MAIL-Bench / MINT, View Collapse and CARE.** Separate curricula, missing cameras, view reliance and executed prefixes to avoid confounding.

## 4. Five lines per paper

<a id="paper-01"></a>

### 01 RT-2

Fixed version: 2307.15818v1, 26 pages. [Original PDF](https://arxiv.org/pdf/2307.15818v1) · [Source](https://arxiv.org/abs/2307.15818v1)

- **Problem:** Robot demonstrations cover limited objects and instructions. How can web knowledge help actual control?
- **Input → output:** Camera image + instruction → discrete tokens for one action → translation, rotation, gripper and termination values.
- **Core change:** Encode actions in an existing VLM vocabulary and co-fine-tune on robot and web tasks. Action discretization itself builds on RT-1.
- **Evidence:** Figure 4 (p.8) and Table 4 (p.23): RT-1 averages 32% on unseen settings versus 62% for RT-2-PaLI-X, with similar seen-task results. Figure 6b (p.10) examines scale and recipe.
- **Limits:** §5 (p.11) and Figure 9 (p.23): semantic transfer does not automatically create new motor skills; unfamiliar dynamics and model latency remain limiting.

<a id="paper-02"></a>

### 02 OpenVLA

Fixed version: 2406.09246v3, 37 pages. [Original PDF](https://arxiv.org/pdf/2406.09246v3) · [Source](https://arxiv.org/abs/2406.09246v3)

- **Problem:** How can a public, adaptable generalist policy lower the barrier to studying large VLA systems?
- **Input → output:** Original version: a single image + instruction → autoregressive action tokens → continuous control values.
- **Core change:** Combine DINOv2 and SigLIP visual features in a Prismatic-7B VLM, train on multi-robot demonstrations, and study LoRA adaptation and quantization.
- **Evidence:** Figure 5 (p.9) shows adaptation; Table 1 (p.10) compares LoRA and full fine-tuning. Its footnote specifies a smaller data mixture and a SigLIP-only backbone variant. Main architecture: Figure 2 (p.4).
- **Limits:** §6 (p.11): the original model supports a single image; throughput constrains high-frequency control and reliability remains limited. Do not attribute OFT’s later multi-camera support to the original version.

<a id="paper-03"></a>

### 03 π₀

Fixed version: 2410.24164v4, 17 pages. [Original PDF](https://arxiv.org/pdf/2410.24164v4) · [Source](https://arxiv.org/abs/2410.24164v4)

- **Problem:** How can visual-language knowledge support continuous, high-frequency and dexterous control across robots?
- **Input → output:** Camera views + instruction + robot state → conditional flow-matching action chunks → robot control.
- **Core change:** Add an action expert to a pretrained VLM, model continuous action distributions with flow matching, and combine multi-robot pretraining with task post-training.
- **Evidence:** Figures 7 (p.8), 11 (p.10) and 13 (p.11) examine direct use, adaptation with different demonstration counts, and complex-task post-training. Architecture: Figure 3 (p.4).
- **Limits:** §VII (pp.11–12): some tasks remain unreliable; optimal data mixtures and transfer boundaries are not fully understood. Distinguish results with and without task post-training.

<a id="paper-04"></a>

### 04 Open X-Embodiment / RT-X

Fixed version: 2310.08864v9, 12 pages. [Original PDF](https://arxiv.org/pdf/2310.08864v9) · [Source](https://arxiv.org/abs/2310.08864v9)

- **Problem:** Can experience transfer positively across datasets separated by institutions, robot bodies and formats?
- **Input → output:** Robot demonstrations → standardized interfaces; RT-X takes images + instructions → discrete end-effector actions.
- **Core change:** Create a shared multi-institution dataset and test cross-robot co-training with RT-1-X and RT-2-X. Separate the dataset from the model family.
- **Evidence:** Figures 4–5 (pp.5–6) compare target-robot data with cross-robot co-training. Data and models: Figures 2–3 (pp.3–4).
- **Limits:** §VI (pp.6–7): the tests do not span arbitrary differences in sensing and actuation. Standardized formats do not guarantee equivalent action semantics or plug-and-play control of any robot.

<a id="paper-05"></a>

### 05 Octo

Fixed version: 2405.12213v2, 17 pages. [Original PDF](https://arxiv.org/pdf/2405.12213v2) · [Source](https://arxiv.org/abs/2405.12213v2)

- **Problem:** How can one public policy adapt to different cameras, task descriptions and action spaces with limited target data?
- **Input → output:** Images / optional state + language or goal image → Transformer representations → diffusion action chunks.
- **Core change:** Use modular input tokenizers, a Transformer and replaceable readout heads for heterogeneous interfaces; train on about 800k OXE trajectories. It is not a large VLM language decoder.
- **Evidence:** Table I (p.7) compares pretrained adaptation with training from scratch; Table II (p.7) examines architecture and data choices. Direct-use results: Figure 5 (p.6); architecture: Figure 2 (p.3).
- **Limits:** §V (p.8): use of wrist views and language depends on data coverage. An adaptation mechanism for new interfaces does not guarantee zero-shot control of every interface.

<a id="paper-06"></a>

### 06 FAST

Fixed version: 2501.09747v1, 19 pages. [Original PDF](https://arxiv.org/pdf/2501.09747v1) · [Source](https://arxiv.org/abs/2501.09747v1)

- **Problem:** How can high-frequency actions be learned without long, highly correlated sequences of per-step, per-dimension tokens?
- **Input → output:** Continuous action chunks → DCT, quantization and BPE compression → tokens; decode back to continuous chunks.
- **Core change:** Introduce a temporal-compression action tokenizer. FAST+ is a universal tokenizer; π₀-FAST is a policy trained with the encoding. These names refer to different components.
- **Evidence:** Figure 6 (p.8) compares encodings; Figure 11 (p.10), together with Figure 1, supports training-efficiency gains. Tokenization pipeline: Figure 4 (p.5).
- **Limits:** §VI-E and §VII (pp.9–11): the gain of up to about 5× concerns training time. Autoregressive inference can remain slower than continuous generation, and compression trades accuracy against token length.

<a id="paper-07"></a>

### 07 π₀.₅

Fixed version: 2504.16054v1, 19 pages. [Original PDF](https://arxiv.org/pdf/2504.16054v1) · [Source](https://arxiv.org/abs/2504.16054v1)

- **Problem:** How can robots perform multi-stage manipulation in real homes excluded from training?
- **Input → output:** Images + task instruction + robot state → high-level subtask text → conditional continuous action chunks.
- **Core change:** Extend π₀ with heterogeneous co-training: pretrain using FAST actions and semantic tasks, then post-train a flow expert together with high-level subtask inference.
- **Evidence:** Figure 7 (p.8) measures progress in new homes. Figures 10–11 (p.10) show losses from removing cross-robot data; web-data effects vary by test and are not significant in every ablation. Recipe: Figure 3 (p.4).
- **Limits:** §VI (pp.11–12): unfamiliar handles, occlusion and high-level distraction still cause failures. Memory and complex instruction handling are limited; tested homes do not establish reliability in arbitrary homes.

<a id="paper-08"></a>

### 08 SmolVLA

Fixed version: 2506.01844v1, 24 pages. [Original PDF](https://arxiv.org/pdf/2506.01844v1) · [Source](https://arxiv.org/abs/2506.01844v1)

- **Problem:** How can VLA training and deployment be made cheaper using community data from low-cost robots?
- **Input → output:** Multiple images + instruction + state → a compact VLM → flow action expert → chunks, optionally executed asynchronously.
- **Core change:** Combine an approximately 450M-parameter model, fewer VLM layers, a lightweight expert and community data; decouple prediction from execution.
- **Evidence:** Tables 2–4 (p.11) compare simulation and real tasks. Figure 5 (p.12) shows faster asynchronous execution but lower success on sorting. Architecture: Figure 1; ablations: Tables 6–13 (pp.13–14).
- **Limits:** §5.1 (pp.14–15): original community pretraining mainly uses SO100, with limited scale and embodiment diversity. Adaptation results do not establish zero-shot use on arbitrary platforms.

<a id="paper-09"></a>

### 09 OpenVLA-OFT

Fixed version: 2502.19645v2, 24 pages. [Original PDF](https://arxiv.org/pdf/2502.19645v2) · [Source](https://arxiv.org/abs/2502.19645v2)

- **Problem:** How can slow action generation and downstream adaptation of original OpenVLA be improved?
- **Input → output:** LIBERO configuration: third-person and wrist images + language + state → one forward pass regresses an 8-step continuous chunk.
- **Core change:** Combine parallel decoding, chunking, continuous actions and an L1 objective. FiLM language modulation is an optional OFT+ extension.
- **Evidence:** Figure 2 (p.3) summarizes design choices. Tables I–II (p.6) compare components and speed; Table IV (p.17) specifies settings. Mean LIBERO success rises from 76.5% to 97.1% under the paper’s protocol.
- **Limits:** §VIII (p.10): L1 may struggle with multiple equally valid actions; extension of the recipe to pretraining is unproven, and language reliance may vary. Throughput gains are not equal episode-time gains.

<a id="paper-10"></a>

### 10 LIBERO

Fixed version: 2306.03310v2, 44 pages. [Original PDF](https://arxiv.org/pdf/2306.03310v2) · [Source](https://arxiv.org/abs/2306.03310v2)

- **Problem:** How can transfer of object, spatial and behavioral knowledge be studied in robot lifelong learning?
- **Input → output:** Task descriptions, scenes, goals and demonstrations → training/evaluation protocols → success and lifelong-learning metrics.
- **Core change:** Provide procedural task generation and suites that separate transfer factors, with demonstrations and shared experiment interfaces.
- **Evidence:** §5.2 (pp.7–10) shows that architectures and algorithms change transfer and forgetting. Task structure: Figure 1 and §4.2 (pp.2,5); metrics: §5.1 and Figure 3 (pp.6–7).
- **Limits:** §7 (p.10): the simulation task scope is limited. Original lifelong-learning metrics and later single-policy VLA success rates use different protocols; high scores do not prove real-world reliability.

<a id="paper-11"></a>

### 11 LIBERO-Plus

Fixed version: 2510.13626v3, 32 pages. [Original PDF](https://arxiv.org/pdf/2510.13626v3) · [Source](https://arxiv.org/abs/2510.13626v3)

- **Problem:** Do high-scoring VLAs remain reliable when viewpoints, layouts, lighting and image quality change?
- **Input → output:** Original tasks + seven controlled perturbation axes → closed-loop execution → conditional success, combined shifts and input-dependence diagnostics.
- **Core change:** Systematically perturb LIBERO and combine single-factor, multi-factor and visual/language interventions to diagnose brittleness.
- **Evidence:** Table 1 (p.3) shows degradation under viewpoint and initial-state shifts. §§3–5 (pp.3–8) provide interventions and combined tests. Benchmark/noise settings: Tables 2 and 5 (pp.9,15).
- **Limits:** Findings depend on tested tasks, models and perturbations. Insensitivity to paraphrases alone does not prove language understanding; use removal or target-change controls. This is not a universal robust-training algorithm.

<a id="paper-12"></a>

### 12 ACT

Fixed version: 2304.13705v1, 18 pages. [Original PDF](https://arxiv.org/pdf/2304.13705v1) · [Source](https://arxiv.org/abs/2304.13705v1)

- **Problem:** How can low-cost hardware learn coordinated fine manipulation from few demonstrations while reducing compounding errors?
- **Input → output:** Camera images + joint state → CVAE/Transformer action chunks → temporal ensembling for execution.
- **Core change:** Combine action chunking and temporal ensembling; use a CVAE to capture demonstration variation. Free-form language is not central to the original controller.
- **Evidence:** Figure 8 and §VI (pp.9–10) ablate chunking and ensembling. Tables I–II (p.8) compare tasks; Figures 4–5 (p.4) show architecture and execution.
- **Limits:** §VII (p.10): performance still depends on demonstrations and perception. Data efficiency on selected tasks does not imply general semantics or arbitrary-task generalization.

<a id="paper-13"></a>

### 13 Diffusion Policy

Fixed version: 2303.04137v5, 19 pages. [Original PDF](https://arxiv.org/pdf/2303.04137v5) · [Source](https://arxiv.org/abs/2303.04137v5)

- **Problem:** How can a policy model multiple valid continuous actions and generate coherent sequences?
- **Input → output:** Image/state observation history → conditional denoising of an action sequence → execute a prefix and replan.
- **Core change:** Represent the policy with conditional diffusion and combine visual conditioning with receding-horizon control. Internet-pretrained VLMs and free-form language are not required by the original design.
- **Evidence:** §4.1 (pp.4–5) examines multimodality; §5.4 (pp.8–9) ablates generation/control design. Scoring: §5.2 (p.7); prediction and execution intervals: Figure 2 (p.3).
- **Limits:** §9 (p.13): the policy remains demonstration-dependent; iterative sampling adds latency. Generation and execution horizons trade off. Expressive actions alone do not establish open-world semantic competence.

<a id="paper-14"></a>

### 14 LoRA

Fixed version: 2106.09685v2, 26 pages. [Original PDF](https://arxiv.org/pdf/2106.09685v2) · [Source](https://arxiv.org/abs/2106.09685v2)

- **Problem:** How can adaptation reduce the number of updated/saved parameters and optimizer costs?
- **Input → output:** Pretrained W₀ + target data → learn low-rank BA → save the adapter or merge W₀ + BA.
- **Core change:** Freeze adapted base weights and parameterize the update with two smaller matrices. This is an update mechanism, not an action representation or execution policy.
- **Evidence:** §5 (pp.5–8) compares low-rank and full adaptation on NLP tasks. §§7.1–7.2 (p.10) study placement and rank; mechanism: Figure 1 and §4 (pp.1,4–5).
- **Limits:** Original experiments mainly concern language models. They do not establish VLA performance or memory needs. Base weights and activations still consume memory; VLA heads may need separate training and saving.

<a id="paper-15"></a>

### 15 Long-VLA

Source: original abstract, arXiv:2508.19958v2; checked 22 October 2026. **Reading depth: abstract-level positioning; full text and code not yet verified.** [Source](https://arxiv.org/abs/2508.19958v2) · [PDF](https://arxiv.org/pdf/2508.19958v2)

- **Problem:** How can a long-horizon policy attend to suitable sensory cues during moving versus interaction?
- **Input → output:** Multimodal observations and task conditions → phase-masked policy inputs → manipulation actions.
- **Core change:** Split subtasks into moving and interaction phases, mask inputs accordingly, and introduce L-CALVIN.
- **Evidence:** The abstract reports simulation and robot experiments. Read phase definitions, masking rules and ablations next; figure numbers have not been checked here.
- **Limits:** The focus is long-horizon manipulation and skill chaining; measured gains do not establish robustness to every visual fault.

<a id="paper-16"></a>

### 16 EGR

Source: original abstract, arXiv:2609.03142v1; checked 22 October 2026. **Reading depth: abstract-level positioning; full text and code not yet verified.** [Source](https://arxiv.org/abs/2609.03142v1) · [PDF](https://arxiv.org/pdf/2609.03142v1)

- **Problem:** How can multi-sensor policies avoid spurious inter-sensor correlations under limited demonstrations?
- **Input → output:** Per-frame, per-sensor relevance → gated consistency objectives → a robust multimodal policy.
- **Core change:** Encourage invariance for low-evidence sensors and single-sensor sufficiency for high-evidence sensors, with no inference-time overhead.
- **Evidence:** The abstract describes BEHAVIOR-1K diagnostics, 47 rollout skills and two robot setups. Read evidence estimation and regularization details.
- **Limits:** The setting concerns sensor relevance and multimodal robustness, rather than explicit task-phase masking.

<a id="paper-17"></a>

### 17 FrameSkip

Source: original abstract, arXiv:2605.13757v1; checked 22 October 2026. **Reading depth: abstract-level positioning; full text and code not yet verified.** [Source](https://arxiv.org/abs/2605.13757v1) · [PDF](https://arxiv.org/pdf/2605.13757v1)

- **Problem:** How can training avoid low-change segments overwhelming brief alignment, grasp and release events?
- **Input → output:** Demonstration trajectories → frame-importance scores and selection → otherwise unchanged VLA training.
- **Core change:** Combine action variation, visual-action coherence, progress priors and gripper-transition preservation in the data loader.
- **Evidence:** The abstract reports RoboCasa-GR1, SimplerEnv and LIBERO. Check retained-frame ratios, total sampled examples and simple selection baselines.
- **Limits:** It selects training frames without changing the action head or inference. Retention ratios and sampled-example counts affect interpretation.

<a id="paper-18"></a>

### 18 PHASER

Source: original abstract, arXiv:2606.03598v2; checked 22 October 2026. **Reading depth: abstract-level positioning; full text and code not yet verified.** [Source](https://arxiv.org/abs/2606.03598v2) · [PDF](https://arxiv.org/pdf/2606.03598v2)

- **Problem:** How can continual skill acquisition avoid forgetting brief critical phases that receive too little replay?
- **Input → output:** Historical demonstrations and phase boundaries → replay allocation and interference routing → a continually adapted policy.
- **Core change:** Allocate replay support by phase and prioritize forgetting risk; Auto-PC combines action change points with VLM semantic verification.
- **Evidence:** The abstract reports three VLA backbones on LIBERO continual-learning suites. Check matched replay budgets and phase-extraction ablations.
- **Limits:** This primarily addresses forgetting in continual learning. It does not directly establish same-task robustness after one fine-tuning stage.

<a id="paper-19"></a>

### 19 STRONG-VLA

Source: original abstract, arXiv:2604.10055v3; checked 22 October 2026. **Reading depth: abstract-level positioning; full text and code not yet verified.** [Source](https://arxiv.org/abs/2604.10055v3) · [PDF](https://arxiv.org/pdf/2604.10055v3)

- **Problem:** How can multimodal robustness training avoid conflicting with clean-task execution?
- **Input → output:** Perturbed and clean demonstrations → two-stage fine-tuning → a robust policy.
- **Core change:** First learn under increasingly difficult multimodal perturbations; then realign with clean task data. Evaluate 28 perturbation types.
- **Evidence:** The abstract reports several VLA backbones on LIBERO and AIRBOT robot tests. Read the two-stage recipe and clean-performance recovery.
- **Limits:** Interpret total updates, perturbation distributions and clean-realignment cost through the specific two-stage configuration.

<a id="paper-20"></a>

### 20 MAIL-Bench / MINT

Source: original abstract, arXiv:2609.35003v1; checked 22 October 2026. **Reading depth: abstract-level positioning; full text and code not yet verified.** [Source](https://arxiv.org/abs/2609.35003v1) · [PDF](https://arxiv.org/pdf/2609.35003v1)

- **Problem:** Can a policy finish a task after a camera stops providing subsequent frames?
- **Input → output:** Camera interruptions at different stages → closed-loop evaluation; MINT trains and selectively supplements missing views.
- **Core change:** MAIL-Bench interrupts views along successful reference trajectories. MINT combines missing-view training with optical-flow/world-model completion.
- **Evidence:** The abstract reports π₀.₅, GR00T N1.5 and AgiBot G2. Check interruption timing, duration and when predicted views are withdrawn.
- **Limits:** Losing subsequent camera frames differs from brief blur. Interruption duration and timing are part of the evaluation definition.

<a id="paper-21"></a>

### 21 View Collapse

Source: original abstract, arXiv:2609.33707v1; checked 22 October 2026. **Reading depth: abstract-level positioning; full text and code not yet verified.** [Source](https://arxiv.org/abs/2609.33707v1) · [PDF](https://arxiv.org/pdf/2609.33707v1)

- **Problem:** Does adversarial training improve perception, or make a multi-view policy abandon a corrupted camera?
- **Input → output:** Multi-view policy + controlled view interventions → evaluation across seven LIBERO-Plus shifts and reliance diagnostics.
- **Core change:** Identify wrist-view-dominated collapse, distinguish robust perception from robust fusion, and apply View Swap.
- **Evidence:** The abstract reports shift-dependent effects. Read single-view interventions and View Swap ablations.
- **Limits:** Stability under corruption of one view does not prove improved perception in that view. Adversarial training is not a generic generalization solution.

<a id="paper-22"></a>

### 22 CARE

Source: original abstract, arXiv:2609.32550v1; checked 22 October 2026. **Reading depth: abstract-level positioning; full text and code not yet verified.** [Source](https://arxiv.org/abs/2609.32550v1) · [PDF](https://arxiv.org/pdf/2609.32550v1)

- **Problem:** Why can a one-step observation corruption cause prolonged failure, and how does executed chunk length matter?
- **Input → output:** Current and previous predicted action chunks → consistency check → dynamic execution prefix.
- **Core change:** Study single-step corruption and shorten execution under inconsistent chunk predictions.
- **Evidence:** The abstract reports low overhead and preserved clean performance. Read corruption insertion, prefix selection and fixed-prefix controls.
- **Limits:** Inference-time execution control differs from training augmentation. Execution length must be controlled when comparing robustness gains.

## 5. Ten distinctions to keep clear

| Potential confusion | Correct interpretation |
| --- | --- |
| Action tokens vs language instructions | Tokens encode control; instructions describe the task. |
| Action dimensions vs an action chunk | RT-2’s 8 fields describe one action; OFT’s 8 steps span future times. |
| Continuous actions vs one-pass generation | π₀ still iterates; OFT can directly regress a chunk. |
| Prediction horizon, execution prefix and sampling iterations | How far to predict, how much to execute, and how often to update during generation. |
| FAST training vs inference speed | The headline gain of about 5× concerns training time. |
| Few trainable parameters vs little memory | Backbone weights, activations, images and action heads still consume memory. |
| New homes vs new motor skills | Environmental generalization does not automatically imply skill generalization. |
| Success vs progress | Binary completion differs from partial stage scores. |
| Phase inputs, evidence gating, selection and replay | Intervention points and learning settings differ; these are not interchangeable algorithms. |
| Robustness vs stronger perception | A policy may rely on another camera or shorten its execution prefix. |

## 6. Report and reading self-check

For the original fourteen, explain the problem, inputs/outputs, change, supporting figures and limits. For the eight additions, state the abstract-only reading depth and identify what the full text must resolve. Do not invent figure numbers or reproduction results.

Source notes: links for the additions are fixed to the checked abstract versions. Long-VLA’s page states CoRL 2025 acceptance; the other additions are listed as preprints without a claim of formal acceptance. π₀ uses v4, Diffusion Policy v5 and LIBERO-Plus v3. Page numbers should not be mixed with a retitled conference version.
