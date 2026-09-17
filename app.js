/* =========================================================================
   The Barcelona Offsite Configurator — app.js
   Vanilla JS state machine: step data, navigation, selection storage,
   blueprint compilation, and Netlify Forms submission.
   ========================================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     1. STEP DATA
     ----------------------------------------------------------------------- */
  const STEPS = [
    {
      key: "archetype",
      eyebrow: "01 · TEAM COMPOSITION",
      question: "Who is entering the room?",
      subtitle:
        "Select your team composition to calibrate facilitation depth and venue scale.",
      metaLabel: "Scale",
      options: [
        {
          id: "cofounders",
          num: "01",
          title: "Co-Founders & Executive Committee",
          meta: "2–5 leaders",
          desc:
            "Relational alignment, founder dynamics, equity and vision clarity.",
        },
        {
          id: "csuite",
          num: "02",
          title: "C-Suite & Functional Leadership",
          meta: "6–12 executives",
          desc:
            "Strategy-to-execution, decision rights (RACI), operational friction resolution.",
        },
        {
          id: "scaleup",
          num: "03",
          title: "Cross-Functional Scale-Up",
          meta: "15–35+ people",
          desc:
            "Remote-first cohesion, cultural integration, operating rhythms.",
        },
      ],
    },
    {
      key: "tension",
      eyebrow: "02 · THE INFLECTION POINT",
      question: "What is the critical tension to resolve?",
      subtitle:
        "Choose the primary operational outcome required for this engagement.",
      metaLabel: "Focus",
      options: [
        {
          id: "governance",
          num: "01",
          title: "Strategy-to-Execution & Governance",
          desc:
            "Resolving decision latency, eliminating silos, locking in a binding 90-day board-ready compact.",
        },
        {
          id: "friction",
          num: "02",
          title: "Leadership Friction & Co-Founder Reset",
          desc:
            "Surfacing unexpressed conflict, clarifying role boundaries, restoring executive trust.",
        },
        {
          id: "innovation",
          num: "03",
          title: "Product Innovation & Roadmap Lab",
          desc:
            "Divergent creative sprints, market repositioning, stress-testing new product bets.",
        },
        {
          id: "remote",
          num: "04",
          title: "Remote Team Culture & Momentum",
          desc:
            "Rebuilding trust across distributed functions with zero internal planning overhead.",
        },
      ],
    },
    {
      key: "setting",
      eyebrow: "03 · PHYSICAL ARCHITECTURE",
      question: "Where does your team operate best?",
      subtitle: "Matching physical geography to your strategic objective.",
      metaLabel: "Setting",
      options: [
        {
          id: "masia",
          num: "01",
          title: "Secluded Catalan Masia",
          desc:
            "Historic private estate (Solsona / Costa Brava / Girona). Total seclusion, private chef, zero urban distraction.",
        },
        {
          id: "urban",
          num: "02",
          title: "Dynamic Urban Atelier",
          desc:
            "Creative Poblenou loft / Norrsken House Barcelona overlooking the sea. High-energy creative friction.",
        },
        {
          id: "winery",
          num: "03",
          title: "Penedès Winery & Coastal Villa",
          desc:
            "Secluded estate among vineyards near Sitges. Deep focus balanced with open-air gastronomy.",
        },
      ],
    },
    {
      key: "hospitality",
      eyebrow: "04 · HOSPITALITY & CADENCE",
      question: "How should the table be set?",
      subtitle: "Select the culinary experience tailored to your team's culture.",
      metaLabel: "Model",
      options: [
        {
          id: "chef",
          num: "01",
          title: "Private Executive Chef & Sommelier",
          desc:
            "100% turnkey open-hearth dining, wine pairings, and continuous hospitality.",
        },
        {
          id: "grounded",
          num: "02",
          title: "Grounded & Collaborative",
          desc:
            "Open-fire culinary masterclass, shared preparation, and authentic communal connection.",
        },
        {
          id: "city",
          num: "03",
          title: "City Gastronomy & Sea Immersion",
          desc:
            "Curated dining in El Born paired with a private sunset Mediterranean catamaran charter.",
        },
      ],
    },
    {
      key: "facilitation",
      eyebrow: "05 · INTELLECTUAL ARCHITECTURE",
      question: "What level of in-room moderation is required?",
      subtitle:
        "Our engagements are led directly by former C-suite operators and venture studio designers.",
      metaLabel: "Depth",
      options: [
        {
          id: "operator",
          num: "01",
          title: "Former C-Suite Operator Mediation",
          desc:
            "Confidential 1:1 intake, hard commercial debate moderation, binding compact delivery.",
        },
        {
          id: "venture",
          num: "02",
          title: "Venture Studio Innovation Facilitation",
          desc:
            "Design thinking, divergent roadmap labs, rapid prototyping, and GTM stress-testing.",
        },
        {
          id: "culture",
          num: "03",
          title: "Turnkey Culture & Connection Facilitation",
          desc:
            "Light-touch alignment workshops (25%) + 75% team bonding and experiential program.",
        },
      ],
    },
  ];

  /* -----------------------------------------------------------------------
     2. BLUEPRINT COMPILATION LOGIC
     ----------------------------------------------------------------------- */

  // Title fragments, keyed by [tension][setting]
  const TITLE_MATRIX = {
    governance: {
      masia: "Executive Strategy Masia Sprint",
      urban: "Strategy Atelier Intensive",
      winery: "Coastal Governance Retreat",
    },
    friction: {
      masia: "Founder Reset Masia Retreat",
      urban: "Urban Founder Realignment",
      winery: "Penedès Trust Retreat",
    },
    innovation: {
      masia: "Masia Innovation Sprint",
      urban: "Barcelona Urban Innovation Atelier",
      winery: "Coastal Innovation Lab",
    },
    remote: {
      masia: "Masia Culture Reset",
      urban: "Urban Momentum Atelier",
      winery: "Penedès Reconnection Retreat",
    },
  };

  const DELIVERABLE_MATRIX = {
    governance: "Signed Binding 90-Day Board Compact & Decision RACI",
    friction: "Signed Binding Peer Compact",
    innovation: "Validated Roadmap & GTM Stress-Test Brief",
    remote: "Remote Operating Charter",
  };

  function findOption(stepKey, optionId) {
    const step = STEPS.find((s) => s.key === stepKey);
    return step.options.find((o) => o.id === optionId);
  }

  function compileBlueprint(selections) {
    const tensionId = selections.tension;
    const settingId = selections.setting;

    const titleCore =
      (TITLE_MATRIX[tensionId] && TITLE_MATRIX[tensionId][settingId]) ||
      "Tailored Executive Offsite";

    const settingOpt = findOption("setting", settingId);
    const tensionOpt = findOption("tension", tensionId);
    const hospitalityOpt = findOption("hospitality", selections.hospitality);
    const facilitationOpt = findOption("facilitation", selections.facilitation);

    return {
      title: "The " + titleCore,
      pills: [
        { label: "Setting", value: settingOpt.title },
        { label: "Focus", value: tensionOpt.title },
        { label: "Hospitality", value: hospitalityOpt.title },
        { label: "Facilitation", value: facilitationOpt.title },
      ],
      blocks: [
        {
          label: "Recommended Setting",
          value: settingOpt.title,
          sub: settingOpt.desc,
        },
        {
          label: "Intellectual Lead",
          value: facilitationOpt.title,
          sub: facilitationOpt.desc,
        },
        {
          label: "Key Monday Deliverable",
          value: DELIVERABLE_MATRIX[tensionId] || "Tailored Operating Brief",
          sub: tensionOpt.desc,
        },
        {
          label: "Hospitality Model",
          value: hospitalityOpt.title,
          sub: hospitalityOpt.desc,
        },
      ],
    };
  }

  /* -----------------------------------------------------------------------
     3. STATE
     ----------------------------------------------------------------------- */
  const state = {
    stepIndex: 0, // 0-based into STEPS
    selections: {}, // { archetype: 'cofounders', tension: 'governance', ... }
  };

  /* -----------------------------------------------------------------------
     4. DOM REFERENCES
     ----------------------------------------------------------------------- */
  const el = {
    progressFill: document.getElementById("progress-fill"),
    stepCounter: document.getElementById("step-counter"),
    backBtn: document.getElementById("back-btn"),
    stepContainer: document.getElementById("step-container"),
    blueprintSection: document.getElementById("blueprint"),
    configuratorSection: document.getElementById("configurator"),
    formSection: document.getElementById("lead-form-wrap"),
    confirmSection: document.getElementById("confirmation"),
    leadForm: document.getElementById("lead-form"),
  };

  /* -----------------------------------------------------------------------
     5. RENDERING
     ----------------------------------------------------------------------- */
  function renderStep() {
    const step = STEPS[state.stepIndex];
    const pct = Math.round(((state.stepIndex + 1) / STEPS.length) * 100);

    el.progressFill.style.width = pct + "%";
    el.stepCounter.textContent =
      "Step 0" + (state.stepIndex + 1) + " of 0" + STEPS.length;
    el.backBtn.hidden = state.stepIndex === 0;

    const selectedId = state.selections[step.key];

    const cardsHTML = step.options
      .map((opt) => {
        const isSelected = opt.id === selectedId;
        return (
          '<button type="button" class="option-card' +
          (isSelected ? " is-selected" : "") +
          '" data-option-id="' +
          opt.id +
          '" aria-pressed="' +
          isSelected +
          '">' +
          '<span class="option-num">' +
          opt.num +
          " &middot;</span>" +
          '<span class="option-body">' +
          '<span class="option-title">' +
          opt.title +
          "</span>" +
          (opt.meta
            ? '<span class="option-meta"><span class="option-meta-label">' +
              step.metaLabel +
              "</span>" +
              opt.meta +
              "</span>"
            : "") +
          '<span class="option-desc"><span class="option-meta-label">' +
          (opt.meta ? "Detail" : step.metaLabel) +
          "</span>" +
          opt.desc +
          "</span>" +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    el.stepContainer.innerHTML =
      '<div class="step-head">' +
      '<div class="eyebrow">' +
      step.eyebrow +
      "</div>" +
      '<div class="hairline-rule"></div>' +
      '<h1 class="step-question">' +
      step.question +
      "</h1>" +
      '<p class="step-subtitle">' +
      step.subtitle +
      "</p>" +
      "</div>" +
      '<div class="option-grid" data-count="' +
      step.options.length +
      '">' +
      cardsHTML +
      "</div>";

    el.stepContainer.querySelectorAll(".option-card").forEach((btn) => {
      btn.addEventListener("click", onSelectOption);
    });

    el.stepContainer.classList.remove("step-enter");
    // force reflow to restart animation
    void el.stepContainer.offsetWidth;
    el.stepContainer.classList.add("step-enter");
  }

  function onSelectOption(e) {
    const btn = e.currentTarget;
    const step = STEPS[state.stepIndex];
    state.selections[step.key] = btn.dataset.optionId;

    el.stepContainer
      .querySelectorAll(".option-card")
      .forEach((c) => c.classList.remove("is-selected"));
    btn.classList.add("is-selected");
    btn.setAttribute("aria-pressed", "true");

    window.setTimeout(() => {
      if (state.stepIndex < STEPS.length - 1) {
        state.stepIndex += 1;
        renderStep();
      } else {
        showBlueprint();
      }
    }, 420);
  }

  function goBack() {
    if (state.stepIndex === 0) return;
    state.stepIndex -= 1;
    renderStep();
  }

  /* -----------------------------------------------------------------------
     6. BLUEPRINT SCREEN
     ----------------------------------------------------------------------- */
  function showBlueprint() {
    const bp = compileBlueprint(state.selections);

    el.configuratorSection.hidden = true;
    el.blueprintSection.hidden = false;

    const pillsHTML = bp.pills
      .map(
        (p) =>
          '<span class="pill"><span class="pill-label">' +
          p.label +
          "</span>" +
          p.value +
          "</span>"
      )
      .join("");

    const blocksHTML = bp.blocks
      .map(
        (b) =>
          '<div class="blueprint-block">' +
          '<div class="blueprint-block-label">' +
          b.label +
          "</div>" +
          '<div class="blueprint-block-value">' +
          b.value +
          "</div>" +
          '<p class="blueprint-block-sub">' +
          b.sub +
          "</p>" +
          "</div>"
      )
      .join("");

    el.blueprintSection.innerHTML =
      '<div class="blueprint-inner">' +
      '<div class="eyebrow">TAILORED OFFSITE BLUEPRINT</div>' +
      '<div class="hairline-rule"></div>' +
      '<h1 class="blueprint-title">' +
      bp.title +
      "</h1>" +
      '<div class="pill-row">' +
      pillsHTML +
      "</div>" +
      '<div class="blueprint-grid">' +
      blocksHTML +
      "</div>" +
      '<a href="#" id="restart-link" class="restart-link">Start over &amp; reconfigure</a>' +
      "</div>" +
      '<div id="lead-form-wrap"></div>' +
      '<div id="confirmation" hidden></div>';

    // re-bind refs, since we replaced innerHTML
    el.formSection = document.getElementById("lead-form-wrap");
    el.confirmSection = document.getElementById("confirmation");

    document
      .getElementById("restart-link")
      .addEventListener("click", (e) => {
        e.preventDefault();
        restart();
      });

    renderLeadForm(bp);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    state.stepIndex = 0;
    state.selections = {};
    el.blueprintSection.hidden = true;
    el.blueprintSection.innerHTML = "";
    el.configuratorSection.hidden = false;
    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* -----------------------------------------------------------------------
     7. LEAD CAPTURE FORM + NETLIFY FORMS SUBMISSION
     ----------------------------------------------------------------------- */
  function renderLeadForm(bp) {
    el.formSection.innerHTML =
      '<form id="lead-form" class="lead-form" name="offsite-blueprint" method="POST" data-netlify="true" netlify-honeypot="bot-field">' +
      '<input type="hidden" name="form-name" value="offsite-blueprint">' +
      '<p class="hp-field" hidden><label>Do not fill this out: <input name="bot-field"></label></p>' +
      '<input type="hidden" name="blueprint_title" value="' +
      bp.title +
      '">' +
      '<input type="hidden" name="selection_archetype" value="' +
      (state.selections.archetype || "") +
      '">' +
      '<input type="hidden" name="selection_tension" value="' +
      (state.selections.tension || "") +
      '">' +
      '<input type="hidden" name="selection_setting" value="' +
      (state.selections.setting || "") +
      '">' +
      '<input type="hidden" name="selection_hospitality" value="' +
      (state.selections.hospitality || "") +
      '">' +
      '<input type="hidden" name="selection_facilitation" value="' +
      (state.selections.facilitation || "") +
      '">' +
      '<div class="eyebrow">REQUEST YOUR BRIEF</div>' +
      '<div class="hairline-rule"></div>' +
      '<div class="form-grid">' +
      '<label class="field field-full">' +
      "<span>Work Email *</span>" +
      '<input type="email" name="email" required placeholder="you@company.com">' +
      "</label>" +
      '<label class="field">' +
      "<span>Full Name</span>" +
      '<input type="text" name="name" placeholder="Full name">' +
      "</label>" +
      '<label class="field">' +
      "<span>Company Name</span>" +
      '<input type="text" name="company" placeholder="Company">' +
      "</label>" +
      '<label class="field field-full">' +
      "<span>Target Timeline / Quarter</span>" +
      '<select name="timeline">' +
      '<option value="">Select a timeframe</option>' +
      '<option value="Q1 2027">Q1 2027</option>' +
      '<option value="Q2 2027">Q2 2027</option>' +
      '<option value="Q3 2027">Q3 2027</option>' +
      '<option value="Q4 2027">Q4 2027</option>' +
      '<option value="Flexible / not sure yet">Flexible / not sure yet</option>' +
      "</select>" +
      "</label>" +
      "</div>" +
      '<button type="submit" class="btn-primary submit-btn">Lock In Dates &amp; Request Tailored Brief</button>' +
      '<p class="form-subtext">We limit engagements each quarter to protect delivery quality. Sven &amp; Farid personally review all briefs within 24 hours.</p>' +
      '<p class="form-error" id="form-error" hidden>Something went wrong sending your request. Please try again, or email <a href="mailto:contact@kuma.partners">contact@kuma.partners</a> directly.</p>' +
      "</form>";

    document
      .getElementById("lead-form")
      .addEventListener("submit", onSubmitLeadForm);
  }

  function encodeFormData(form) {
    const data = new FormData(form);
    return Array.from(data.entries())
      .map(
        (kv) =>
          encodeURIComponent(kv[0]) + "=" + encodeURIComponent(kv[1])
      )
      .join("&");
  }

  function onSubmitLeadForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const submitBtn = form.querySelector(".submit-btn");
    const errorEl = document.getElementById("form-error");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    if (errorEl) errorEl.hidden = true;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(form),
    })
      .then(() => {
        showConfirmation();
      })
      .catch(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Lock In Dates & Request Tailored Brief";
        if (errorEl) errorEl.hidden = false;
      });
  }

  function showConfirmation() {
    el.formSection.hidden = true;
    el.confirmSection.hidden = false;
    el.confirmSection.innerHTML =
      '<div class="confirmation-inner">' +
      '<div class="eyebrow">REQUEST RECEIVED</div>' +
      '<div class="hairline-rule"></div>' +
      "<h2>Your blueprint is on its way.</h2>" +
      "<p>Sven and Farid personally review every brief. Expect a reply within 24 hours with your tailored PDF and a short set of next steps.</p>" +
      "</div>";
    el.confirmSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* -----------------------------------------------------------------------
     8. INIT
     ----------------------------------------------------------------------- */
  el.backBtn.addEventListener("click", goBack);
  renderStep();
})();
