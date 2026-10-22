# 22 VLA Papers: What They Do and What the Tests Show

Updated 22 October 2026. The original 14 entries keep fixed PDF versions and figure/page references. Only the abstracts of the 8 additions have been checked; full texts and code have not been reviewed in detail. Page counts start at PDF page 1.

## 1. What does each group do?

| Group | Papers | Main question |
| --- | --- | --- |
| A · Models for many tasks | RT-2, OpenVLA, π₀, Octo, π₀.₅, SmolVLA | How can one model do different tasks? |
| B · Shared training data | Open X-Embodiment / RT-X | Can different robots share demonstrations? |
| C · Actions and further training | ACT, Diffusion Policy, FAST, OpenVLA-OFT, LoRA | How are actions calculated and costs reduced? |
| D · Tasks and success rates | LIBERO, LIBERO-Plus | How is successful execution tested? |
| E · What training focuses on | Long-VLA, EGR, FrameSkip, PHASER | Which inputs, moments and old examples matter? |
| F · When inputs go wrong | STRONG-VLA, MAIL-Bench / MINT, View Collapse, CARE | What happens with damaged or missing views? |

Start with RT-2 → OpenVLA → π₀. Then read OFT, action methods and testing papers. The last two groups examine what training focuses on and what happens when inputs go wrong. Groups help navigation; their methods are not interchangeable.

Terms used in the papers:

| Term | Meaning here |
| --- | --- |
| Policy | A model that chooses the next action from the scene and request. |
| Token | A unit a model reads or writes; an action token usually represents a control value with an ID. |
| Fine-tuning | Further training of an existing model on new examples. |
| Action chunk | Several future action steps predicted together. |
| Generalization | Handling an object, scene or request not specifically practised. |
| Robustness | Continuing to work when inputs are damaged or disturbed. |

## 2. What does each paper do?

| Paper | What it does | Training or test material | How actions or scores are produced | Read alongside |
| --- | --- | --- | --- | --- |
| [01 RT-2](#paper-01) | Model for many tasks | Web images/text and robot demonstrations | Action IDs in sequence, then control values | Read with OpenVLA: both use action IDs. |
| [02 OpenVLA](#paper-02) | Model for many tasks | OXE and other real-robot demonstrations | Action IDs in sequence, then control values | OFT builds on it and changes action calculation. |
| [03 π₀](#paper-03) | Model for many tasks | Proprietary and public robot demonstrations | Revise a numerical sequence; output several steps | Compare with Diffusion Policy: both revise random numbers, using different training methods. |
| [04 Open X-Embodiment / RT-X](#paper-04) | Shared demonstrations | Recordings across institutions and robots | Shared data; RT-X uses action IDs | Supplies demonstrations for OpenVLA and Octo. |
| [05 Octo](#paper-05) | Model for many tasks | Selected OXE demonstrations | Repeated revisions produce an action sequence | Compare the full model with OpenVLA and its action calculation with Diffusion Policy. |
| [06 FAST](#paper-06) | Shorter action records | Action records for compression; demonstrations for the policy | Shorter IDs decoded back to actions | Used during π₀.₅ training; compare with per-time-step IDs. |
| [07 π₀.₅](#paper-07) | Model for many tasks | Robot demos, web images/text and step labels | Choose the current step, then calculate actions | Extends π₀ and also uses FAST. |
| [08 SmolVLA](#paper-08) | Model for many tasks | Mainly SO100 community data, then target examples | Several steps at once; overlap calculation and execution | Related to π₀ action calculation; additionally focuses on size and waiting time. |
| [09 OpenVLA-OFT](#paper-09) | Actions and further training | Existing OpenVLA plus target demonstrations | Directly predict 8 numerical steps | Builds on OpenVLA; compare direct prediction with repeated updates in π₀ and Diffusion Policy. |
| [10 LIBERO](#paper-10) | Test tasks | Simulation tasks, demos and start states | Completion and forgetting scores | Supplies tasks used to test methods such as OFT. |
| [11 LIBERO-Plus](#paper-11) | Test tasks | LIBERO tasks with changed conditions | Success counts under changed conditions | Changes LIBERO conditions to test whether high scores are reliable. |
| [12 ACT](#paper-12) | Learn from demonstrations | Human-teleoperated demonstrations | Predict steps and average overlapping results | Explains predicting ahead and averaging overlapping movements. |
| [13 Diffusion Policy](#paper-13) | Learn from demonstrations | Robot demonstrations of target tasks | Revise numbers; execute a few steps and observe | Octo also uses diffusion; compare with π₀ and OFT. |
| [14 LoRA](#paper-14) | Fewer updated parameters | Existing models and new data; original tests mainly language | Change trainable parameters, not action output | Can train OpenVLA further; separate from how actions are calculated. |
| [15 Long-VLA](#paper-15) | Select information during training | Demonstrations and sensor records; scope in paper | Choose inputs by phase, then predict actions | Uses task phases for inputs; EGR changes training by sensor usefulness. |
| [16 EGR](#paper-16) | Select information during training | Demonstrations and sensor records; scope in paper | Train according to sensor usefulness | Asks which sensor helps now, rather than using the same movement-phase labels. |
| [17 FrameSkip](#paper-17) | Select information during training | Demonstrations and sensor records; scope in paper | Select training image/action records | Selects current training records; PHASER revisits old ones. |
| [18 PHASER](#paper-18) | Select information during training | Demonstrations and sensor records; scope in paper | Choose old task steps to practise again | Addresses forgetting during new learning, rather than one-stage frame selection. |
| [19 STRONG-VLA](#paper-19) | When inputs go wrong | Demonstrations and sensor records; scope in paper | Disturbed-data practice, then normal-data practice | Changes training; CARE mainly changes execution length. |
| [20 MAIL-Bench / MINT](#paper-20) | When inputs go wrong | Demonstrations and sensor records; scope in paper | Test camera loss and try filling missing images | Persistent camera loss differs from CARE’s one-step corruption. |
| [21 View Collapse](#paper-21) | When inputs go wrong | Demonstrations and sensor records; scope in paper | Check which camera the model actually uses | Explains why higher scores can come from switching camera reliance. |
| [22 CARE](#paper-22) | When inputs go wrong | Demonstrations and sensor records; scope in paper | Compare predictions and choose steps to execute | Changes when to observe again, rather than the demonstrations. |

## 3. Connections worth remembering

1. **RT-2 and OpenVLA:** convert actions into IDs predicted one by one. A methodological link does not imply shared RT-2 weights.
2. **OpenVLA and OFT:** OFT continues from OpenVLA and directly predicts numerical actions for several future steps.
3. **Diffusion Policy, Octo and π₀:** start with random numbers and revise them into actions, but learn different update rules. Diffusion and flow matching are explained in the entries.
4. **ACT, FAST and SmolVLA:** predict ahead, shorten action records, and reduce calculation/waiting respectively. Their time savings occur in different places.
5. **OXE, LIBERO and LIBERO-Plus:** shared examples, test tasks, and changes to test conditions respectively.
6. **Long-VLA, EGR, FrameSkip and PHASER:** select inputs, change training by sensor usefulness, select time steps, and revisit old examples.
7. **STRONG-VLA, MINT, View Collapse and CARE:** change training, handle missing images, check camera reliance, and choose how many actions to execute.

## 4. Five lines per paper

<a id="paper-01"></a>

### 01 RT-2

Fixed version: 2307.15818v1, 26 pages. [Original PDF](https://arxiv.org/pdf/2307.15818v1) · [Source](https://arxiv.org/abs/2307.15818v1)

- **Problem:** Can knowledge learned from images and text help with objects or requests missing from robot practice?
- **Input → output:** Camera image + request → action IDs → movement, rotation, gripper and stop commands.
- **Core change:** Divide action values into 256 bins with IDs. Train on both robot actions and image-question tasks.
- **Evidence:** Figure 4 (p.8) and Table 4 (p.23): RT-1 averages 32% in the corresponding unseen-setting tests versus 62% for RT-2-PaLI-X, with similar seen-task scores. Figure 6b (p.10) checks model size and training choices.
- **Limits:** §5 (p.11) and Figure 9 (p.23): understanding new requests does not create new physical skills. Unfamiliar weight or friction and slow computation can still cause failures.

<a id="paper-02"></a>

### 02 OpenVLA

Fixed version: 2406.09246v3, 37 pages. [Original PDF](https://arxiv.org/pdf/2406.09246v3) · [Source](https://arxiv.org/abs/2406.09246v3)

- **Problem:** Can a public robot model let others continue training with their own data?
- **Input → output:** Original version: one image + instruction → action IDs one by one → movement values.
- **Core change:** DINOv2 and SigLIP process images; a language model uses those outputs with the instruction. Release weights and code, and test updates to a small set of parameters.
- **Evidence:** Figure 5 (p.9) tests further training on another robot. Table 1 (p.10) compares LoRA with updating all weights; it uses a smaller data mixture and SigLIP-only model variant. Main model: Figure 2 (p.4).
- **Limits:** §6 (p.11): the original mainly uses one image and calculates IDs in sequence. Later OFT multi-camera support is not an original-version capability.

<a id="paper-03"></a>

### 03 π₀

Fixed version: 2410.24164v4, 17 pages. [Original PDF](https://arxiv.org/pdf/2410.24164v4) · [Source](https://arxiv.org/abs/2410.24164v4)

- **Problem:** How can an image-and-language model calculate detailed, connected movements?
- **Input → output:** Camera views + instruction + robot state → a sequence of future actions → execute actions from it.
- **Core change:** Add a network for actions. Start with random numbers and repeatedly update them toward demonstrated actions, called flow matching. Learn varied tasks, then practise target tasks.
- **Evidence:** Figure 7 (p.8) tests without target-specific training; Figure 11 (p.10) varies new demonstration counts; Figure 13 (p.11) tests further practice on difficult tasks. Network: Figure 3 (p.4).
- **Limits:** §VII (pp.11–12): some tasks remain unreliable. Data amounts and transfer to other tasks or robots remain unresolved. State whether target-task training was used.

<a id="paper-04"></a>

### 04 Open X-Embodiment / RT-X

Fixed version: 2310.08864v9, 12 pages. [Original PDF](https://arxiv.org/pdf/2310.08864v9) · [Source](https://arxiv.org/abs/2310.08864v9)

- **Problem:** Can demonstrations from different robots and institutions be combined to help learning?
- **Input → output:** Robot recordings → a shared data format; RT-X then uses images and instructions to predict action IDs.
- **Core change:** Organize demonstrations and test with RT-1-X/RT-2-X whether other robots’ data improves a target robot.
- **Evidence:** Figures 4–5 (pp.5–6) compare target-robot data alone with added data from other robots. Data: Figure 2 (p.3); models: Figure 3 (p.4).
- **Limits:** §VI (pp.6–7): tested robots do not cover every design. Shared files do not guarantee matching units or coordinate directions. New robots can still need further training.

<a id="paper-05"></a>

### 05 Octo

Fixed version: 2405.12213v2, 17 pages. [Original PDF](https://arxiv.org/pdf/2405.12213v2) · [Source](https://arxiv.org/abs/2405.12213v2)

- **Problem:** Can a model be trained further with a few new examples after cameras, tasks or robot controls change?
- **Input → output:** Images, optional robot state, and an instruction or goal image → a sequence of future actions.
- **Core change:** Use replaceable parts for reading inputs and producing actions; first train on about 800,000 demonstrations. Generate actions by repeatedly revising random numbers.
- **Evidence:** Table I (p.7) compares shared-data training followed by target practice with starting from scratch. Table II (p.7) changes networks and data. Without-target-training scores: Figure 5 (p.6); network: Figure 2 (p.3).
- **Limits:** §V (p.8): replaceable input parts do not guarantee untrained use of any new camera or robot. Wrist-camera and instruction use still depend on the data.

<a id="paper-06"></a>

### 06 FAST

Fixed version: 2501.09747v1, 19 pages. [Original PDF](https://arxiv.org/pdf/2501.09747v1) · [Source](https://arxiv.org/abs/2501.09747v1)

- **Problem:** Closely recorded actions are often similar. Can the model predict fewer IDs?
- **Input → output:** Action sequence → numbers describing its changes → scale and round → shorter IDs; decode back into actions before execution.
- **Core change:** DCT rewrites the sequence as a sum of waves with different rates, recording how much of each wave is used. Round them and use BPE IDs for common number sequences. FAST+ is a general tokenizer; π₀-FAST is a policy using it.
- **Evidence:** Figure 4 (p.5) shows actions becoming shorter IDs. Figure 6 (p.8) compares recording methods; Figure 11 (p.10) and Figure 1 check training time.
- **Limits:** §VI-E and §VII (pp.9–11): the gain of up to about 5× concerns training time. IDs still need sequential prediction. Shorter records can lose more movement detail.

<a id="paper-07"></a>

### 07 π₀.₅

Fixed version: 2504.16054v1, 19 pages. [Original PDF](https://arxiv.org/pdf/2504.16054v1) · [Source](https://arxiv.org/abs/2504.16054v1)

- **Problem:** Can the robot finish multi-step tidying tasks in homes excluded from training?
- **Input → output:** Images + request + robot state → choose the current step → calculate its movements.
- **Core change:** Learn from robot actions, image-text tasks and step labels. First learn FAST action IDs, then continue training an action network and the choice of current subtask.
- **Evidence:** Figure 7 (p.8) measures steps completed in new homes. Figures 10–11 (p.10) remove training sources one at a time. Removing other-robot data reduces scores; web-data effects depend on the test and are not always clear. Training: Figure 3 (p.4).
- **Limits:** §VI (pp.11–12): unfamiliar handles, occlusion and wrong subtask choices still cause failures. A new home does not make every physical skill new or establish reliability anywhere.

<a id="paper-08"></a>

### 08 SmolVLA

Fixed version: 2506.01844v1, 24 pages. [Original PDF](https://arxiv.org/pdf/2506.01844v1) · [Source](https://arxiv.org/abs/2506.01844v1)

- **Problem:** Can a smaller model and community demonstrations reduce training and running costs?
- **Input → output:** Cameras + instruction + robot state → an action sequence; calculate the next one while executing the current one.
- **Core change:** Use about 450 million parameters, fewer network layers and community data. Overlap prediction and execution to reduce waiting.
- **Evidence:** Tables 2–4 (p.11) compare simulation and real tasks. Figure 5 (p.12) shows shorter task time with overlapping calculation/execution, but lower sorting success. Network: Figure 1; component-removal tests: Tables 6–13 (pp.13–14).
- **Limits:** §5.1 (pp.14–15): original community data mainly uses SO100. Results after training on another platform do not establish untrained use on any robot.

<a id="paper-09"></a>

### 09 OpenVLA-OFT

Fixed version: 2502.19645v2, 24 pages. [Original PDF](https://arxiv.org/pdf/2502.19645v2) · [Source](https://arxiv.org/abs/2502.19645v2)

- **Problem:** Can further training make original OpenVLA faster and more successful?
- **Input → output:** Typical LIBERO setting: main/wrist cameras + instruction + state → directly predict 8 future action steps in one pass.
- **Core change:** Replace sequential IDs with simultaneous numerical actions. Penalize absolute prediction errors, called L1. Optional OFT+ also lets instructions adjust image processing.
- **Evidence:** Figure 2 (p.3) lists calculation choices. Tables I–II (p.6) compare changes and speed; Table IV (p.17) lists settings. Under the paper’s tests, mean LIBERO success rises from 76.5% to 97.1%.
- **Limits:** §VIII (p.10): one numerical prediction may not preserve several valid choices. More predicted actions per second do not imply equally faster whole episodes.

<a id="paper-10"></a>

### 10 LIBERO

Fixed version: 2306.03310v2, 44 pages. [Original PDF](https://arxiv.org/pdf/2306.03310v2) · [Source](https://arxiv.org/abs/2306.03310v2)

- **Problem:** Does a robot remember old tasks after learning new ones, and can old practice help?
- **Input → output:** Simulation tasks, start states and demonstrations → training and execution tests → completion and forgetting scores.
- **Core change:** Provide tasks that separately change objects, spatial relations and behaviors, making the contribution of earlier practice easier to test.
- **Evidence:** §5.2 (pp.7–10) compares networks and training methods for forgetting and help on new tasks. Tasks: Figure 1 and §4.2 (pp.2,5); scoring: §5.1 and Figure 3 (pp.6–7).
- **Limits:** §7 (p.10): simulation covers limited tasks. Forgetting scores differ from later VLA full-task success rates and do not establish real-robot reliability.

<a id="paper-11"></a>

### 11 LIBERO-Plus

Fixed version: 2510.13626v3, 32 pages. [Original PDF](https://arxiv.org/pdf/2510.13626v3) · [Source](https://arxiv.org/abs/2510.13626v3)

- **Problem:** Do high-scoring models still work after camera, lighting, layout or image quality changes?
- **Input → output:** LIBERO tasks with changed conditions → the robot looks and acts repeatedly → count successes for each condition.
- **Core change:** Change layout, cameras, start states, wording, lighting, backgrounds and noise. Combine changes and test whether images and instructions actually affect actions.
- **Evidence:** Table 1 (p.3) shows losses after camera/start-state changes. §§3–5 (pp.3–8) test single changes, combined changes and removed inputs. Settings: Tables 2 and 5 (pp.9,15).
- **Limits:** Findings apply to tested tasks and conditions. Unchanged actions after a paraphrase can mean understanding or ignoring language; target changes help distinguish them. This paper mainly supplies tests and analysis.

<a id="paper-12"></a>

### 12 ACT

Fixed version: 2304.13705v1, 18 pages. [Original PDF](https://arxiv.org/pdf/2304.13705v1) · [Source](https://arxiv.org/abs/2304.13705v1)

- **Problem:** Can low-cost robots learn connected movements from few examples without errors accumulating?
- **Input → output:** Images + joint state → predict future actions → average overlapping predictions for the same time step.
- **Core change:** Predict several steps together and average repeated predictions with weights. A CVAE represents different demonstrated ways of doing the task. The original controller mainly does not use free-form language.
- **Evidence:** Figure 8 and §VI (pp.9–10) remove ahead prediction or overlapping-result averaging to test their contribution. Scores: Tables I–II (p.8); network/execution: Figures 4–5 (p.4).
- **Limits:** §VII (p.10): results still depend on demonstrations and images. Few-shot success on selected operations does not establish understanding of arbitrary requests.

<a id="paper-13"></a>

### 13 Diffusion Policy

Fixed version: 2303.04137v5, 19 pages. [Original PDF](https://arxiv.org/pdf/2303.04137v5) · [Source](https://arxiv.org/abs/2303.04137v5)

- **Problem:** If going left or right are both valid, how can a model retain different action choices?
- **Input → output:** Recent images/state → repeatedly revise random numbers → an action sequence; execute a few steps and look again.
- **Core change:** Train the model to repair actions mixed with random noise, called diffusion. Execute part of the prediction, observe again and calculate a new sequence.
- **Evidence:** §4.1 (pp.4–5) tests different valid actions. §5.4 (pp.8–9) changes generation and execution settings. Scoring: §5.2 (p.7); predicted versus executed steps: Figure 2 (p.3).
- **Limits:** §9 (p.13): relevant demonstrations are still needed. Repeated calculations take time. Executing more steps delays the next observation; varied actions alone do not imply understanding any instruction.

<a id="paper-14"></a>

### 14 LoRA

Fixed version: 2106.09685v2, 26 pages. [Original PDF](https://arxiv.org/pdf/2106.09685v2) · [Source](https://arxiv.org/abs/2106.09685v2)

- **Problem:** Can further training update and save fewer model parameters?
- **Input → output:** An existing model + new data → learn two small matrices → use their product to modify the original weights.
- **Core change:** Keep large original matrices fixed and train smaller added ones. Their product supplies the change, called LoRA. It does not specify robot action output.
- **Evidence:** §5 (pp.5–8) compares updating fewer weights with updating all weights on language tasks. §§7.1–7.2 (p.10) change placement and matrix size. Figure 1 and §4 (pp.1,4–5) explain the matrix update.
- **Limits:** Original tests mainly use language models. They do not establish VLA scores or memory needs; base weights, intermediate calculations and action-output parts still use memory.

<a id="paper-15"></a>

### 15 Long-VLA

Source: original abstract, arXiv:2508.19958v2; checked 22 October 2026. **Reading depth: only the abstract has been checked; full text and code have not been reviewed.** [Source](https://arxiv.org/abs/2508.19958v2) · [PDF](https://arxiv.org/pdf/2508.19958v2)

- **Problem:** How can a robot connect several operations into a longer task?
- **Input → output:** Images and task request → hide selected inputs depending on moving/interaction phase → calculate actions.
- **Core change:** Split subtasks into moving and interaction phases, keep relevant inputs, and introduce L-CALVIN for longer-task tests.
- **Evidence:** The abstract reports simulation and robot tests. Check phase definitions, hidden inputs and tests removing individual changes in the full paper; unchecked figure numbers are not supplied here.
- **Limits:** Tests focus on connecting long-horizon operations. These results do not establish reliability under every camera fault.

<a id="paper-16"></a>

### 16 EGR

Source: original abstract, arXiv:2609.03142v1; checked 22 October 2026. **Reading depth: only the abstract has been checked; full text and code have not been reviewed.** [Source](https://arxiv.org/abs/2609.03142v1) · [PDF](https://arxiv.org/pdf/2609.03142v1)

- **Problem:** With few demonstrations, can irrelevant sensor changes mislead a multi-sensor model?
- **Input → output:** Estimated task-relevance scores for each frame/sensor → changed training requirements → learned sensor use.
- **Core change:** Train actions to resist changes in unhelpful sensors; also practise when useful sensor information alone remains. The extra training calculation is not needed when running the policy.
- **Evidence:** The abstract reports BEHAVIOR-1K, 47 skills evaluated while acting, and two robot systems. Check sensor scoring and how scores change training requirements.
- **Limits:** The method asks whether sensors are useful now, rather than using the same moving/interaction labels as Long-VLA. Scores and equations need full-text checking.

<a id="paper-17"></a>

### 17 FrameSkip

Source: original abstract, arXiv:2605.13757v1; checked 22 October 2026. **Reading depth: only the abstract has been checked; full text and code have not been reviewed.** [Source](https://arxiv.org/abs/2605.13757v1) · [PDF](https://arxiv.org/pdf/2605.13757v1)

- **Problem:** Can repeated frames dominate training while brief grasp and release events receive too little practice?
- **Input → output:** Demonstration → score and select time steps → train the original model on their images and actions.
- **Core change:** Check action changes, matching image/action changes, task progress, and gripper closing/opening events.
- **Evidence:** The abstract reports RoboCasa-GR1, SimplerEnv and LIBERO. Check retained frames, total training records and comparisons with simpler frame selection.
- **Limits:** The change selects training records, leaving action output and running procedures unchanged. Retained frames and total sampled records matter for interpreting results.

<a id="paper-18"></a>

### 18 PHASER

Source: original abstract, arXiv:2606.03598v2; checked 22 October 2026. **Reading depth: only the abstract has been checked; full text and code have not been reviewed.** [Source](https://arxiv.org/abs/2606.03598v2) · [PDF](https://arxiv.org/pdf/2606.03598v2)

- **Problem:** How can new-task learning avoid forgetting brief but important steps in old tasks?
- **Input → output:** Old demonstrations and step boundaries → select what to keep and practise again → continue training.
- **Core change:** Keep examples for phases and revisit those at risk of forgetting. Find changes in action signals, then use a VLM to check boundaries. Practising old data again is called replay.
- **Evidence:** The abstract reports three VLA models and LIBERO tests of learning new tasks without forgetting old ones. Check equal numbers of old examples and automatic step-boundary tests.
- **Limits:** This mainly studies forgetting during new-task learning, rather than a single round of corruption training.

<a id="paper-19"></a>

### 19 STRONG-VLA

Source: original abstract, arXiv:2604.10055v3; checked 22 October 2026. **Reading depth: only the abstract has been checked; full text and code have not been reviewed.** [Source](https://arxiv.org/abs/2604.10055v3) · [PDF](https://arxiv.org/pdf/2604.10055v3)

- **Problem:** Can training on damaged images and altered instructions make normal-condition performance worse?
- **Input → output:** Disturbed and normal demonstrations → two rounds of further training → test task completion.
- **Core change:** First practise increasingly difficult disturbances; then train on normal data to recover ordinary performance. Test 28 visual/text disturbance types.
- **Evidence:** The abstract reports multiple models on LIBERO and AIRBOT tests. Check each training round and whether normal-condition scores recover.
- **Limits:** Interpret scores together with total training updates, disturbances used and the amount of extra training on normal data.

<a id="paper-20"></a>

### 20 MAIL-Bench / MINT

Source: original abstract, arXiv:2609.35003v1; checked 22 October 2026. **Reading depth: only the abstract has been checked; full text and code have not been reviewed.** [Source](https://arxiv.org/abs/2609.35003v1) · [PDF](https://arxiv.org/pdf/2609.35003v1)

- **Problem:** Can a robot finish after one camera stops sending new images?
- **Input → output:** Interrupt different cameras at different task steps → test completion; MINT also trains for missing input.
- **Core change:** Practise with missing views. Try filling images using observed movement or a prediction model; stop using predicted views when they become unreliable.
- **Evidence:** The abstract reports π₀.₅, GR00T N1.5 and AgiBot G2. Check interruption timing/duration and when predicted replacement images are withdrawn.
- **Limits:** A stream that stops differs from one blurred frame. Interruption timing and duration are part of the test.

<a id="paper-21"></a>

### 21 View Collapse

Source: original abstract, arXiv:2609.33707v1; checked 22 October 2026. **Reading depth: only the abstract has been checked; full text and code have not been reviewed.** [Source](https://arxiv.org/abs/2609.33707v1) · [PDF](https://arxiv.org/pdf/2609.33707v1)

- **Problem:** If one camera becomes unreliable, is the model seeing better or just using another camera?
- **Input → output:** Change camera views separately → test seven LIBERO-Plus changes → identify which view matters.
- **Core change:** Training with deliberately difficult inputs can make the model rely mainly on its wrist camera. Controlled view changes and View Swap help examine why scores improve.
- **Evidence:** The abstract says effects vary by test condition. Check separate camera interventions and whether View Swap changes camera reliance.
- **Limits:** Stable scores with one damaged camera do not by themselves show better perception through that camera; it may simply be used less.

<a id="paper-22"></a>

### 22 CARE

Source: original abstract, arXiv:2609.32550v1; checked 22 October 2026. **Reading depth: only the abstract has been checked; full text and code have not been reviewed.** [Source](https://arxiv.org/abs/2609.32550v1) · [PDF](https://arxiv.org/pdf/2609.32550v1)

- **Problem:** Why can one damaged image cause a long failure, and how do steps executed before looking again matter?
- **Input → output:** Compare consecutive action predictions → choose steps to execute → observe again.
- **Core change:** Use agreement between consecutive predictions to choose execution length. Fewer steps allow another image and decision sooner.
- **Evidence:** The abstract reports little extra computation and preserved normal-condition scores. Check corruption timing, chosen execution steps and fixed-step comparisons.
- **Limits:** This changes execution, not training data. Comparisons must state how many actions are executed before another observation.

## 5. Distinctions that prevent confusion

| Phrases | Difference |
| --- | --- |
| Instruction and action IDs | The instruction gives the goal; IDs encode movement. |
| Eight fields and eight steps | RT-2’s fields describe one action; OFT’s steps span future times. |
| Predict several steps and calculate in one pass | π₀ still updates repeatedly; OFT can directly output values. |
| Steps predicted, steps executed and generation updates | Three separate settings. |
| Faster training and faster task completion | FAST’s gain of up to about 5× concerns training time. |
| Fewer updated parameters and low memory | Base weights and intermediate calculations still occupy memory. |
| New room and new physical skill | Familiar operations in a new room do not establish every new skill. |
| Full completion and partial scores | Completing some steps is not a full-task success rate. |
| Select inputs, select examples and revisit old examples | Different changes to training. |
| Work with a bad camera and see better through it | The model may simply switch to another camera. |

## 6. Can you explain five things after reading?

The problem; what goes in and comes out; the concrete change; which figure or table supports it; and what the result does not establish.

Only the abstracts of the eight additions have been checked. Unknown details and figure numbers are not filled in.

Version notes: Long-VLA’s page states CoRL 2025 acceptance; other additions are listed as preprints. π₀ uses v4, Diffusion Policy v5 and LIBERO-Plus v3. Page numbers cannot be assumed to match other versions.
