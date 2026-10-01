// Single source of truth for product pages, nav dropdown, footer links,
// the /products hub cards, and the sitemap.
//
// To add a product: add an object here. Everything else picks it up.
// To hide one without deleting it: set `published: false`.
//
// `customPage: true` means the page lives in its own folder under
// /products/<slug>/page.jsx instead of being rendered by [slug]/page.jsx.
//
// `navGroup` decides which column the product appears in inside the Coverage
// mega menu in NavBar.jsx: "health" | "life" | "everyday". A product without
// one falls back to "everyday" rather than disappearing from the nav.

export const products = [
  {
    slug: "health-insurance",
    published: true,
    navGroup: "health",
    navLabel: "Health Insurance",
    cardTitle: "Health Coverage Made Clear",
    h1: "Health Coverage That Fits the Way You Live",
    metaTitle: "Health Insurance Plans for You and Your Family",
    metaDescription:
      "Get licensed help comparing health plans: monthly premiums, deductibles, doctor networks, and plan types for individuals, families, and self-employed workers.",
    pageIntro:
      "See what a plan really costs over a year, which doctors it includes, and what you get for the premium.",
    cardImage: "/assets/img/health/cardiology-2.webp",
    cardText:
      "Weigh plans side by side, make sense of deductibles and copays, and land on coverage that suits your care and your budget.",
    cardIcon: "fas fa-heartbeat",
    cardFeatures: ["Side-by-Side Plans", "Doctor Check"],
    heroImage: "/assets/img/health/cardiology-2.webp",
    heroImageAlt: "Advisor comparing health plan options with a client at a desk",
    heading: "Choosing a Health Plan",
    description:
      "Most people buy health insurance without anyone ever explaining how it works. We sit down with individuals, families, and self-employed clients and translate the plan documents into plain numbers: what you pay each month, what you pay when you use care, which providers are included, and which benefits you will lean on day to day. A plan that saves you forty dollars a month can end up costing two thousand dollars more by the end of the year, and that difference rarely shows up on the first screen you see. Your licensed agent narrows the list to the plans that make sense for your household and is still a phone call away after you enroll.",
    features: [
      {
        icon: "fas fa-list-check",
        title: "Side-by-Side Plans",
        text: "Line up plan types together so monthly price, worst-case costs, and provider access are easy to weigh against each other.",
      },
      {
        icon: "fas fa-hospital",
        title: "Doctor and Hospital Check",
        text: "Find out whether your doctors, specialists, hospitals, and pharmacy are in the plan before you sign anything.",
      },
      {
        icon: "fas fa-stethoscope",
        title: "Benefits in Plain English",
        text: "We explain copays, coinsurance, preventive visits, prescriptions, and urgent care so you know what to expect at the counter.",
      },
      {
        icon: "fas fa-file-medical",
        title: "Help With the Paperwork",
        text: "Applications, plan changes, and renewals handled one step at a time, with someone guiding you through each one.",
      },
    ],
    detailSection: {
      eyebrow: "Our process",
      heading: "From your first question to your first claim",
      lead: "You probably do not need more plans to pick from. You need someone to explain the ones already on the table.",
      items: [
        {
          icon: "bi bi-clipboard-check",
          title: "Start with your needs",
          text: "We begin with the doctors you see, the prescriptions you take, the care you expect this year, and what you can spend each month. That turns a long list into a short one.",
        },
        {
          icon: "bi bi-diagram-2",
          title: "Compare the real tradeoffs",
          text: "Deductibles, copays, coinsurance, networks, and drug tiers go on one page, so you can see exactly what a lower premium costs you in out-of-pocket exposure before you choose.",
        },
        {
          icon: "bi bi-calendar-check",
          title: "Enroll, then review every year",
          text: "We help with deadlines, documents, and the yearly check-in when your plan changes. Carriers revise networks and drug lists annually, so last year's best fit is not always this year's.",
        },
      ],
    },
    faqs: [
      {
        q: "HMO or PPO: what is the real difference?",
        a: "An HMO is typically the cheaper option each month and keeps you inside its network, often with a primary care doctor who handles referrals. A PPO has a higher premium but a wider choice of providers, and you can usually book a specialist on your own. The better choice comes down to whether your doctors are in the smaller network.",
      },
      {
        q: "I work for myself. Can I still get good health coverage?",
        a: "Absolutely. Being self-employed does not narrow your choices, and an individual plan is usually the most direct route. Depending on your situation, your premiums may also be tax deductible, so mention it to your tax preparer once your plan is in place.",
      },
      {
        q: "How can I be sure my doctor takes the plan?",
        a: "Each plan has its own network, and online directories are not always up to date. We confirm that your specific doctors and pharmacies participate before you enroll, not after you book an appointment.",
      },
      {
        q: "When am I allowed to sign up?",
        a: "That depends on the kind of coverage. ACA Marketplace plans can only be bought during a set window each year, unless a qualifying life event gives you a special one. Our ACA Marketplace page explains the timing rules, and we can tell you by phone exactly what applies to you right now.",
      },
      {
        q: "Do I pay extra for using an agent?",
        a: "No. The carrier sets the premium, and it is identical whether you enroll on your own or with a licensed agent. The difference is having someone verify your providers before you commit and answer the phone if a claim is denied down the road.",
      },
    ],
    related: ["aca-marketplace-plans", "accident-insurance", "dental-insurance"],
  },

  {
    slug: "life-insurance",
    published: true,
    navGroup: "life",
    navLabel: "Life Insurance",
    cardTitle: "Life Insurance Guidance",
    h1: "Life Insurance That Protects Your People",
    metaTitle: "Term and Permanent Life Insurance Options",
    metaDescription:
      "Compare term, permanent, and final expense life insurance, plus the living benefit riders that can pay out while you are still alive.",
    pageIntro:
      "Coverage sized to your income, your goals, and the people who count on you.",
    cardImage: "/assets/img/service/service1.png",
    cardText:
      "Get help deciding between term and permanent life insurance based on the income you want to protect, the legacy you want to leave, and final costs.",
    cardIcon: "fas fa-shield-alt",
    cardFeatures: ["Term Coverage", "Lifelong Coverage"],
    heroImage: "/assets/img/pages/life-insurance.webp",
    heroImageAlt: "Three generations of a family relaxing together at home",
    heading: "Protecting the People Who Depend on You",
    description:
      "We help clients figure out how much life insurance they need, what kind, and for how long, so the policy actually covers the income, debts, and plans their family would be left with. The right fit depends on what you are protecting and for how many years, and that is exactly the conversation most online quote tools leave out.",
    features: [
      {
        icon: "fas fa-hourglass-half",
        title: "Term Coverage",
        text: "Budget-friendly protection for a fixed number of years, sized around a mortgage, growing kids, or the income your family relies on.",
      },
      {
        icon: "fas fa-infinity",
        title: "Lifelong Coverage",
        text: "Whole life and other permanent options that last for good and can support estate planning or cover final costs.",
      },
      {
        icon: "fas fa-people-roof",
        title: "A Safety Net for Family",
        text: "Leave your loved ones the money to handle big bills and keep the household steady if the worst happens.",
      },
      {
        icon: "fas fa-file-signature",
        title: "Clear Policy Advice",
        text: "We walk through riders, benefit amounts, underwriting, and policy types so you know exactly what you are buying.",
      },
    ],
    detailSection: {
      eyebrow: "Getting it right",
      heading: "The two questions that matter most",
      lead: "How much coverage, and for how many years. Answer those, and the rest falls into place.",
      items: [
        {
          icon: "bi bi-calculator",
          title: "Finding the right amount",
          text: "We add up what is left on the mortgage, the years of income your family would need, childcare and college costs, and subtract what you already have saved. The policy should fill that gap, not follow a generic formula.",
        },
        {
          icon: "bi bi-calendar-range",
          title: "Term versus permanent",
          text: "Term is the less expensive option and covers a set stretch of time, like the years until the house is paid off or the kids are grown. Permanent coverage stays in place for life and can accumulate cash value, which is useful for estate and legacy goals.",
        },
        {
          icon: "bi bi-heart-pulse",
          title: "Riders and health review",
          text: "Riders such as living benefits, waiver of premium, and child coverage change what the policy can do. Your age, health history, and tobacco use change what it costs. We look at both with you before you apply.",
        },
      ],
    },
    contentBlocks: [
      {
        type: "prose",
        eyebrow: "What many people never hear about",
        heading: "Coverage you might be able to tap during your lifetime",
        lead:
          "A lot of people assume life insurance only pays after they are gone. That stopped being the full picture years ago.",
        body: [
          "Many of today's policies come with, or can add, riders that let you draw on part of your own death benefit early after a qualifying serious diagnosis. You will hear them called living benefits or accelerated death benefit riders, and they are offered widely across the industry, not by one carrier alone.",
          "The payment goes to you, not to a provider, and you are not limited to medical expenses. People have used it to keep up with the mortgage while out of work, to pay for treatment their health plan would not cover, to travel to a specialist, or just to keep the household afloat during an incredibly hard year. Whatever you draw is subtracted from the amount your beneficiaries receive later.",
        ],
        bullets: [
          {
            title: "Terminal illness",
            text:
              "The oldest form of living benefit, and frequently included without an added premium. It applies when you are diagnosed with a limited life expectancy, as the policy defines it.",
          },
          {
            title: "Chronic illness",
            text:
              "Typically applies when you can no longer perform a certain number of everyday living activities, or when a cognitive impairment means you need substantial supervision.",
          },
          {
            title: "Critical illness",
            text:
              "Applies after a specific diagnosis named in the rider, often conditions like a heart attack, stroke, or cancer. The policy spells out the exact list.",
          },
        ],
      },

      {
        type: "prose",
        heading: "Where living benefits fall short",
        body: [
          "These riders deserve a careful look, not a sales pitch. What they cost, whether they are available, and how the triggers are defined all vary a great deal from policy to policy. Some are built in, while others add a charge or reduce the death benefit by more than the amount you actually receive.",
          "A rider also does not replace health insurance, disability insurance, or long-term care coverage. It overlaps with each of them without standing in for any. What it offers is fast cash, on your terms, at a time when other income has usually dried up.",
          "A claim is decided by the wording in the rider itself, not by any summary, including this one. Read that language before you buy, and ask someone to explain exactly what triggers a payment.",
        ],
      },

      {
        type: "table",
        heading: "Term, permanent, and final expense at a glance",
        intro:
          "Each one does a different job. Most households need one, some need two at different points in life, and very few need all three at the same time.",
        columns: ["", "Term life", "Permanent life", "Final expense"],
        rows: [
          [
            "Length of coverage",
            "A fixed period, often 10, 20, or 30 years",
            "For life, as long as the policy stays funded",
            "For life",
          ],
          [
            "Usual benefit amount",
            "Large, based on income and debts",
            "Large, based on income, estate, or legacy plans",
            "Small, based on a funeral and final bills",
          ],
          [
            "Cost comparison",
            "Least expensive per dollar of coverage",
            "Considerably more than term for the same benefit",
            "Low monthly premium, but high cost per dollar of coverage",
          ],
          [
            "Cash value",
            "No",
            "Yes, with growth that depends on the type of policy",
            "Minimal or none",
          ],
          [
            "Health review",
            "Typically a health questionnaire, occasionally an exam",
            "Typically full underwriting, including an exam",
            "A few health questions, or none",
          ],
          [
            "Most often used for",
            "Replacing income while a mortgage and kids rely on it",
            "Lifetime coverage, estate plans, or building cash value",
            "Keeping funeral costs from draining a loved one's savings",
          ],
        ],
        note:
          "Permanent life includes several kinds of policy, such as whole life and indexed universal life, and they work very differently from one another.",
      },

      {
        type: "prose",
        heading: "How the permanent options compare",
        body: [
          "Whole life is the steady option. The premium stays fixed, cash value grows at a guaranteed rate, and very little changes over the years. If you want coverage you can put in place and mostly forget about, this is it.",
          "Indexed universal life gives you more flexibility and asks more of you in return. Within set limits you can adjust the premium and the death benefit, and cash value growth tracks a market index, subject to caps, floors, and participation rates. It needs a regular check-up rather than sitting untouched, and it is simply the wrong choice for anyone who will not give it that attention.",
        ],
        link: {
          href: "/products/indexed-universal-life",
          label: "See how indexed universal life works and what the tradeoffs are",
        },
      },

      {
        type: "prose",
        heading: "Why the same health history can get two different prices",
        body: [
          "Insurance companies do not all underwrite the same way. A condition that raises your rate at one carrier may be accepted at a standard rate by another, and on the same person the difference can be large. Height and weight, family history, a medication, a weekend hobby, and how long ago something was treated all carry different weight depending on where you apply.",
          "That is the practical reason to work with a broker instead of applying to whichever company shows up in an ad. Which carriers look more kindly on a particular history is not something you can search for, and a declined application at the wrong company becomes something every future application has to explain.",
          "No one can get you a better price than your age and health support. The biggest single driver of your cost is how old you are when you apply, and that number only goes up.",
        ],
        link: {
          href: "/guides/how-much-life-insurance",
          label: "Calculate how much coverage your family really needs",
        },
      },
    ],

    faqs: [
      {
        q: "How do I figure out how much life insurance to buy?",
        a: "Start with what your household would have to pay for if your income disappeared: the remaining mortgage, several years of income, childcare and education, and final costs. Then subtract savings and any coverage you already have. A licensed agent can run those numbers with you instead of relying on a salary multiple.",
      },
      {
        q: "How is term life different from permanent life?",
        a: "Term life lasts a set number of years and usually costs less for the same death benefit. Permanent life is built to cover you for life and can accumulate cash value along the way. The right choice depends on whether the need you are covering is temporary or lifelong.",
      },
      {
        q: "Can I qualify for life insurance with a medical condition?",
        a: "In many cases, yes. Each carrier underwrites differently, so a condition that raises your price at one company may be treated more favorably at another. Certain policies also rely on simplified underwriting, which means fewer health questions. Where you apply makes a bigger difference than most people realize.",
      },
      {
        q: "Will my life insurance cost more if I wait?",
        a: "Usually, yes. Your premium is based mainly on your age and health when you apply, and a policy issued now locks that rate in for its term. Putting it off generally means paying more.",
      },
      {
        q: "What exactly are living benefits, and is there a charge?",
        a: "Living benefits are riders that let you receive part of your death benefit early after a qualifying terminal, chronic, or critical illness diagnosis. The payment goes to you and can be spent however you choose, and the amount you take is subtracted from what your beneficiary gets later. Terminal illness riders are frequently included at no extra premium, while chronic and critical illness riders may add a cost or reduce the benefit by more than you receive. Availability and the definitions that trigger a claim differ by policy, so review them carefully before you buy.",
      },
      {
        q: "What happens when my term life policy runs out?",
        a: "The coverage ends, and the premiums you paid are not returned. Most term policies let you keep renewing year by year afterward, but the price climbs sharply each time. Many also include a conversion option that lets you switch to permanent coverage without answering new health questions. That option usually expires before the term itself does, which makes it one of the most valuable and most overlooked features in a policy. If your term is nearing its end, bring it up well before the last year.",
      },
    ],
    related: ["indexed-universal-life", "final-expense-insurance", "health-insurance"],
  },

  {
    slug: "final-expense-insurance",
    published: true,
    navGroup: "life",
    navLabel: "Final Expense",
    cardTitle: "Final Expense Coverage",
    h1: "Final Expense Coverage",
    metaTitle: "Final Expense and Burial Insurance",
    metaDescription:
      "Final expense insurance to cover funeral and burial costs. A licensed Florida agent explains simplified and guaranteed issue options and what they typically cost.",
    pageIntro:
      "A policy built to pay for the funeral, the burial, and the bills that come right after.",
    cardImage: "/assets/img/health/final_expense.png",
    cardText:
      "Set aside coverage for the funeral, burial, and other end-of-life costs so the people you love are not left carrying the bill.",
    cardIcon: "fas fa-hand-holding-heart",
    cardFeatures: ["Funeral Costs", "Peace of Mind for Family"],
    heroImage: "/assets/img/pages/final-expense.webp",
    heroImageAlt: "Older woman and her daughter reviewing final expense planning documents at home",
    heading: "Planning Ahead for Final Costs",
    description:
      "Final expense insurance gives your family money for the funeral, burial, and other end-of-life costs through a simple, dependable benefit. The coverage amounts are smaller than a traditional life policy and the application is usually quicker, which makes it a sensible choice when your goal is to cover a specific bill rather than replace years of income.",
    features: [
      {
        icon: "fas fa-file-invoice-dollar",
        title: "Covering the Funeral",
        text: "Pick an amount that can go toward funeral services, burial or cremation, and the arrangements that come with them.",
      },
      {
        icon: "fas fa-hand-holding-heart",
        title: "Easing the Load on Family",
        text: "A benefit that takes the money worries off your loved ones when they are already going through enough.",
      },
      {
        icon: "fas fa-clipboard-check",
        title: "Simple to Apply",
        text: "Compare policies with short applications, steady premiums, and benefit amounts that match what you want covered.",
      },
      {
        icon: "fas fa-shield-alt",
        title: "Fits Your Bigger Plan",
        text: "We make sure your final expense policy works alongside any other life insurance you have, so nothing is left uncovered.",
      },
    ],
    detailSection: {
      eyebrow: "The basics",
      heading: "Modest coverage, simple approval",
      lead: "Final expense is designed to be easy to qualify for and easy for your family to use.",
      items: [
        {
          icon: "bi bi-cash-stack",
          title: "An amount that fits the need",
          text: "Coverage is usually sized to the expected cost of a funeral, burial or cremation, and related expenses, not to long-term income. That keeps the premium affordable on a fixed income.",
        },
        {
          icon: "bi bi-clipboard-heart",
          title: "No exam for most policies",
          text: "Many final expense policies ask health questions rather than requiring a medical exam. Some are guaranteed issue, although those usually come with a waiting period before the full benefit is paid.",
        },
        {
          icon: "bi bi-lock",
          title: "A price that stays put",
          text: "Most policies are built so the premium does not rise as you age and the benefit does not shrink, so you know what you will pay every year.",
        },
      ],
    },
    contentBlocks: [
      {
        type: "prose",
        heading: "How a final expense policy works",
        lead:
          "It is a whole life policy sized for the bill your family will face within days, not for decades of lost income.",
        body: [
          "Benefit amounts generally range from $2,000 to $50,000. The money is paid in cash to the beneficiary you choose, and it is usually not treated as taxable income for them. Since the policy is permanent, it has no end date like a term policy, and since the amounts are modest, the monthly premium stays within reach on a fixed income.",
        ],
        bullets: [
          {
            title: "It never runs out",
            text:
              "Keep paying the premium and the policy stays active for the rest of your life. There is no expiration date to outlive.",
          },
          {
            title: "Your rate is set on day one",
            text:
              "Most final expense policies have a level premium, so the price is based on your age and health when you apply and does not go up later.",
          },
          {
            title: "The benefit stays the same",
            text:
              "The coverage amount stays where you set it. Some other products lower the payout as time goes on, so it is worth asking directly.",
          },
          {
            title: "Usually no medical exam",
            text:
              "Most approvals are based on a few health questions instead of a physical, blood test, or lab work.",
          },
          {
            title: "Your family decides how to use it",
            text:
              "The beneficiary receives cash and can spend it as needed. Families often use part of it for leftover medical bills, travel for relatives, or everyday expenses that keep coming during a funeral.",
          },
        ],
      },

      {
        type: "prose",
        heading: "Where the money usually goes",
        body: [
          "Most funeral homes ask for full payment before the service, which is exactly what puts grieving families in a bind. A final expense benefit is meant to arrive before that bill comes due, often within days of the claim, and it does not have to wait for probate.",
        ],
        bullets: [
          {
            title: "Funeral and burial",
            text: "Service fees, casket, vault, cemetery plot, opening and closing of the grave, and a headstone.",
          },
          {
            title: "Cremation",
            text: "Cremation services, an urn, and a memorial or celebration of life.",
          },
          {
            title: "Outstanding bills",
            text: "Leftover medical balances, hospice charges, or credit card debt.",
          },
          {
            title: "Settling the estate",
            text: "Legal and probate costs, or property taxes that come due while the estate is being handled.",
          },
        ],
        link: {
          href: "/guides/funeral-costs",
          label: "Get the full breakdown of funeral costs and where each dollar goes",
        },
      },

      {
        type: "table",
        heading: "Final expense versus traditional whole life",
        intro:
          "Both are permanent life insurance, but they are designed for different purposes, and the application process is where you notice it most.",
        columns: ["", "Final expense", "Traditional whole life"],
        rows: [
          [
            "Main purpose",
            "Funeral costs and immediate bills",
            "Replacing income and leaving an inheritance",
          ],
          [
            "Usual coverage",
            "$2,000 to $50,000",
            "$100,000 to $1,000,000 or more",
          ],
          [
            "Health review",
            "No exam; a few health questions or none",
            "Full medical exam, lab work, and medical records",
          ],
          [
            "How fast you are approved",
            "Often within minutes or a few days",
            "Usually three to six weeks",
          ],
        ],
        note:
          "Coverage limits, eligible ages, and approval times differ by carrier and by state.",
      },

      {
        type: "prose",
        heading: "The two ways to get approved",
        lead:
          "Final expense coverage is usually available from roughly age 50 to 85, although each carrier sets its own range. The type you qualify for depends on how the insurer treats your health history.",
        body: [
          "Neither option requires a medical exam. The difference is whether you answer any health questions, and that single difference affects your price, how much coverage you can get, and, most important, when the full benefit starts.",
        ],
      },

      {
        type: "table",
        heading: "Simplified issue versus guaranteed issue",
        columns: ["", "Simplified issue", "Guaranteed issue"],
        rows: [
          ["Medical exam", "No", "No"],
          [
            "Health questions",
            "Yes, a brief questionnaire",
            "None",
          ],
          [
            "Approval",
            "Usually quick, based on your answers",
            "Guaranteed if you are within the carrier's age range",
          ],
          [
            "Full benefit begins",
            "Usually on day one, though some products are graded",
            "After a waiting period, usually two to three years",
          ],
          [
            "Highest coverage available",
            "Frequently $40,000 to $50,000",
            "Lower, often capped around $25,000",
          ],
          [
            "Price per dollar of coverage",
            "Lower",
            "Higher, because the insurer accepts risk it has not screened",
          ],
        ],
        note:
          "These figures reflect the market in general and are not guaranteed. Each carrier sets its own waiting periods, caps, and age limits, and they vary by state.",
      },

      {
        type: "prose",
        heading: "Simplified issue: your first stop",
        body: [
          "The application includes a short list of health questions. Instead of sending you for an exam, the carrier checks your answers against prescription records and other databases, which is why many people get a decision the same day.",
          "Most simplified issue policies pay the full benefit starting on day one, so if you pass away soon after approval, your beneficiary still receives the full amount. A few products in this group are graded instead, so confirm which kind you are being offered before signing.",
          "This is where anyone in good or fair health should start, including many people with well-managed conditions like high blood pressure, controlled diabetes, or high cholesterol. Answer every question truthfully. More health histories qualify for immediate, lower-priced coverage than most people assume.",
        ],
      },

      {
        type: "prose",
        heading: "Guaranteed issue: a policy that cannot say no",
        body: [
          "Guaranteed issue has no health questions and no health checks. If you fall within the age range, you are approved. That is a real lifeline for anyone who has been turned down elsewhere, but it comes with a tradeoff you should understand first.",
          "Since the insurer is taking on risk it has not screened, these policies include a graded waiting period, usually two to three years. If you die of natural causes during that time, the full benefit is not paid. Instead, your beneficiary gets back the premiums you paid, and most carriers add interest. Once the waiting period is over, the full benefit applies. Accidental death is typically covered in full from the first day, but confirm that in writing for the specific policy.",
          "This option is meant for people with serious, chronic, or terminal conditions who would not pass a health questionnaire. It is a true safety net, and it is also the more expensive way to buy the same amount of coverage.",
        ],
      },

      {
        type: "prose",
        heading: "Simplified or guaranteed: where to begin",
        body: [
          "Try simplified issue first if there is any chance you will qualify. You get full coverage from day one at a lower monthly price, and a decline costs you nothing but a little time.",
          "Keep guaranteed issue as your backup. If your health rules out a questionnaire, it still leaves your family the money they will need, and a policy with a waiting period is far better than no policy at all.",
          "A licensed agent can tell you which carriers are most favorable to your particular conditions before you apply anywhere, and in final expense that knowledge matters more than in almost any other type of insurance.",
        ],
      },
    ],

    faqs: [
      {
        q: "How much final expense coverage should I get?",
        a: "Most people choose an amount based on what a funeral, burial or cremation, and related costs are likely to be. Those prices depend on where you live and the arrangements your family prefers, so it helps to check local prices before picking a number.",
      },
      {
        q: "Is a medical exam required?",
        a: "Usually not. Most final expense policies rely on a short list of health questions instead of an exam. For people who cannot answer those questions favorably, guaranteed issue policies are available, although they typically have a waiting period before the full benefit is paid.",
      },
      {
        q: "What makes final expense different from other life insurance?",
        a: "It is still life insurance, with a smaller benefit and an easier application. Traditional policies are usually sized to replace income over many years, while final expense is sized to pay a specific set of end-of-life costs.",
      },
      {
        q: "Does my family have to spend the money on the funeral?",
        a: "No. The benefit goes to the beneficiary you name, and they decide how to use it. Many families use part of it for remaining medical bills, travel for relatives, or other costs that come up around the funeral.",
      },
    ],
    related: ["life-insurance", "medicare", "indexed-universal-life"],
  },

  {
    slug: "dental-insurance",
    published: true,
    navGroup: "everyday",
    navLabel: "Dental Insurance",
    cardTitle: "Dental Plans",
    h1: "Dental Plans for Healthy Smiles",
    metaTitle: "Dental Insurance for Individuals and Families",
    metaDescription:
      "Find dental plans that cover cleanings, fillings, and crowns. Licensed guidance on waiting periods, yearly maximums, and dentist networks.",
    pageIntro:
      "Coverage that brings down the cost of checkups, fillings, and the bigger dental work that always seems to show up unannounced.",
    cardImage: "/assets/img/service/service2.png",
    cardText:
      "Explore dental plans that help pay for preventive visits, everyday procedures, and major work for you and your family.",
    cardIcon: "fas fa-tooth",
    cardFeatures: ["Checkups and Cleanings", "Major Work"],
    heroImage: "/assets/img/pages/dental.webp",
    heroImageAlt: "Dentist treating a patient during a routine dental visit",
    heading: "How Dental Coverage Works",
    description:
      "A good dental plan makes routine visits easier to keep up with and takes some of the sting out of bigger procedures. Most plans pay well for cleanings and exams and less for major work, so the yearly maximum and any waiting periods usually matter more than the monthly price.",
    features: [
      {
        icon: "far fa-smile",
        title: "Checkups and Cleanings",
        text: "See what each plan pays for exams, cleanings, and x-rays that keep your teeth in good shape over time.",
      },
      {
        icon: "fas fa-tooth",
        title: "Everyday Procedures",
        text: "Know what is covered for fillings, extractions, and the other common treatments people use most often.",
      },
      {
        icon: "fas fa-star",
        title: "Bigger Dental Work",
        text: "Look at plans that can help pay for crowns, dentures, bridges, and other costly procedures.",
      },
      {
        icon: "fas fa-cog",
        title: "Extras Worth Considering",
        text: "Compare add-ons such as orthodontic coverage, larger dentist networks, and options built for families.",
      },
    ],
    detailSection: {
      eyebrow: "Comparing plans",
      heading: "The three numbers that matter",
      lead: "The premium is easy to compare. These three decide what you actually end up paying.",
      items: [
        {
          icon: "bi bi-graph-up",
          title: "Yearly maximum",
          text: "This is the most the plan will pay for your care in one plan year. After that, the rest is on you. If you expect major work, this is the number to watch.",
        },
        {
          icon: "bi bi-hourglass-split",
          title: "Waiting periods",
          text: "Many plans cover preventive care right away but make you wait before paying for basic or major procedures. If you already know a crown is coming, this can change which plan is the right one.",
        },
        {
          icon: "bi bi-people",
          title: "Network and cost sharing",
          text: "Dentists in the network charge discounted rates, so staying in network usually saves money. Plans also tend to pay different percentages for preventive, basic, and major care.",
        },
      ],
    },
    faqs: [
      {
        q: "Will I have to wait before my dental coverage kicks in?",
        a: "It varies by plan. Checkups and cleanings are often covered immediately, while basic and major procedures can come with a waiting period. If you already know you need work done, let your agent know before you pick a plan.",
      },
      {
        q: "Can I stay with the dentist I already see?",
        a: "Yes, as long as your dentist is in the plan's network, and you will usually pay less than going out of network. We confirm your dentist participates before you enroll.",
      },
      {
        q: "Are braces covered?",
        a: "Orthodontics is usually a separate benefit rather than part of the standard plan. When it is included, it often has its own lifetime maximum and age limits. If braces are the main reason you are shopping, ask about it specifically.",
      },
      {
        q: "Do I need health insurance to buy a dental plan?",
        a: "No. Dental plans can be purchased on their own, and you do not need a medical plan from the same company.",
      },
    ],
    related: ["vision-insurance", "health-insurance", "medicare"],
  },

  {
    slug: "vision-insurance",
    published: true,
    navGroup: "everyday",
    navLabel: "Vision Insurance",
    cardTitle: "Vision Plans",
    h1: "Vision Plans for Clearer Days",
    metaTitle: "Vision Insurance and Eye Care Coverage",
    metaDescription:
      "Vision plans that help pay for eye exams, glasses, and contacts. Compare frame allowances, lens coverage, and in-network eye doctors.",
    pageIntro:
      "Coverage for yearly eye exams, glasses, and contacts, with every allowance laid out up front.",
    cardImage: "/assets/img/service/service3.png",
    cardText:
      "Learn how vision plans help with routine eye exams, glasses, and contacts, and which eye doctors and retailers you can use.",
    cardIcon: "fas fa-eye",
    cardFeatures: ["Yearly Eye Exams", "Glasses and Contacts"],
    heroImage: "/assets/img/pages/vision.webp",
    heroImageAlt: "Eye care professional reviewing family vision coverage with parents and children",
    heading: "How Vision Coverage Works",
    description:
      "Vision coverage makes it easier to keep up with eye exams and lowers what you pay for glasses, contacts, and other routine eye care. It works differently from medical insurance: rather than deductibles and coinsurance, most plans use flat copays and fixed dollar allowances, so you can know your cost before your appointment.",
    features: [
      {
        icon: "fas fa-eye",
        title: "Yearly Eye Exams",
        text: "Find out how often exams are covered and what is included for adults, kids, and seniors.",
      },
      {
        icon: "fas fa-glasses",
        title: "Glasses",
        text: "Compare what each plan puts toward frames, lenses, coatings, and lens upgrades.",
      },
      {
        icon: "fas fa-circle-dot",
        title: "Contact Lenses",
        text: "See how contact lens benefits work, how often you can replace them, and how the allowance is applied.",
      },
      {
        icon: "fas fa-store",
        title: "Where You Can Go",
        text: "Check which eye doctors, stores, and vision networks you can use before choosing a plan.",
      },
    ],
    detailSection: {
      eyebrow: "What a vision plan pays",
      heading: "Allowances instead of deductibles",
      lead: "Learn the three allowances and you can compare any two plans in a few minutes.",
      items: [
        {
          icon: "bi bi-eyeglasses",
          title: "Exam and frames",
          text: "Most plans cover a routine exam for a flat copay and give you a set dollar amount for frames. You pay anything over that amount, so the frame allowance is usually where plans differ the most.",
        },
        {
          icon: "bi bi-layers",
          title: "Lenses",
          text: "Single vision, bifocal, and progressive lenses are covered at different levels, and extras such as anti-reflective coating or light-adjusting lenses are often priced separately.",
        },
        {
          icon: "bi bi-arrow-repeat",
          title: "Glasses or contacts",
          text: "In most plans you can use your eyewear benefit for glasses or contacts during a benefit period, but not both. If you wear both, find out which one the plan covers by default.",
        },
      ],
    },
    faqs: [
      {
        q: "Is a yearly eye exam covered?",
        a: "Most plans cover one routine eye exam per plan year for a flat copay. Some count the year from your last visit instead of by calendar year, so check which rule applies before you book.",
      },
      {
        q: "Can I get both glasses and contacts with my benefit?",
        a: "Usually you pick one each benefit period. Plans typically give you an eyewear allowance you can use for frames and lenses or for contacts, but not both.",
      },
      {
        q: "What if the frames I like cost more than my allowance?",
        a: "The extra amount is yours to pay. Many plans also give you a discount on the amount over the allowance when you use an in-network provider, which helps reduce the extra cost.",
      },
      {
        q: "Does vision insurance cover medical eye problems?",
        a: "Generally, no. Vision plans are for routine care like exams, glasses, and contacts. Eye diseases, injuries, and eye surgery are usually handled by your health insurance.",
      },
    ],
    related: ["dental-insurance", "health-insurance", "medicare"],
  },

  {
    slug: "medicare",
    published: true,
    navGroup: "health",
    navLabel: "Medicare",
    cardTitle: "Medicare Guidance",
    h1: "Medicare Made Simpler",
    metaTitle: "Medicare Advantage, Medigap, and Part D Help",
    metaDescription:
      "Licensed help comparing Medicare Advantage, Medigap, and Part D drug plans, with guidance on eligibility, enrollment deadlines, and your yearly plan review.",
    pageIntro:
      "Advantage, Medigap, and Part D laid out side by side, with every deadline on your radar.",
    cardImage: "/assets/img/health/staff-4.webp",
    cardText:
      "Help choosing between Medicare Advantage, Medigap, and Part D, with support on deadlines, benefits, and drug coverage.",
    cardIcon: "fas fa-notes-medical",
    cardFeatures: ["Choosing a Plan", "Drug Plan Check"],
    heroImage: "/assets/img/health/staff-4.webp",
    heroImageAlt: "Advisor walking an older client through Medicare choices",
    heading: "Your Medicare Choices",
    description:
      "Medicare comes with a lot of choices, and we help you sort through Advantage, Medigap, and Part D with less confusion and less stress. Your first big decision is whether to combine Original Medicare with a Medigap policy and a drug plan, or to choose an all-in-one Medicare Advantage plan. That choice affects everything that follows, and it is much easier to get right at the start than to undo later.",
    features: [
      {
        icon: "fas fa-heartbeat",
        title: "Medicare Advantage",
        text: "Look at all-in-one plans that can bundle medical coverage, prescriptions, and extra benefits together.",
      },
      {
        icon: "fas fa-plus-square",
        title: "Medigap Policies",
        text: "Learn how Medicare Supplement plans can lower the costs Original Medicare leaves you to pay.",
      },
      {
        icon: "fas fa-pills",
        title: "Drug Coverage",
        text: "Check Part D drug lists, preferred pharmacies, and what your prescriptions will cost before you sign up.",
      },
      {
        icon: "fas fa-calendar-check",
        title: "Enrollment Support",
        text: "Get help with eligibility, deadlines, switching plans, and your yearly coverage review.",
      },
    ],
    detailSection: {
      eyebrow: "Where to start",
      heading: "Two ways to get your Medicare",
      lead: "Most of your other decisions depend on which of these two routes you take.",
      items: [
        {
          icon: "bi bi-signpost-split",
          title: "Original Medicare with a Medigap policy",
          text: "You keep wide access to any provider that accepts Medicare, and a Medigap policy picks up much of what Original Medicare does not pay. Prescription coverage comes from a separate Part D plan.",
        },
        {
          icon: "bi bi-box-seam",
          title: "Medicare Advantage",
          text: "A private plan that delivers your Medicare benefits, often including drug coverage and extras like dental or vision. Upfront costs are usually lower, but you work within a provider network and the plan's rules.",
        },
        {
          icon: "bi bi-capsule",
          title: "Reviewing your medications",
          text: "Drug plans vary by covered drugs, pricing tiers, and preferred pharmacies. One prescription can cost very different amounts on two plans, so we check your actual medications instead of just comparing premiums.",
        },
      ],
    },
    contentBlocks: [
      {
        type: "prose",
        heading: "Comparing the two routes",
        lead:
          "Both are part of Medicare, but they handle your costs, your choice of doctors, and your future flexibility in nearly opposite ways.",
        body: [
          "Medicare Advantage changes how your Medicare benefits are delivered. A Medicare-approved private plan manages your Part A and Part B coverage, typically includes prescription drug coverage, and often adds routine dental, vision, or hearing benefits. You still pay your Part B premium, and the plan's own premium is often low or even zero. In return, you use a provider network and follow the plan's rules for referrals and prior authorization.",
          "A Medicare Supplement, also called Medigap, works the other way. You stay on Original Medicare and can see any provider in the country who accepts it. The Medigap policy then covers much of the cost Original Medicare leaves behind. The monthly premium is higher, and you add a separate Part D plan for prescriptions.",
        ],
      },

      {
        type: "table",
        heading: "Medicare Advantage versus Medigap",
        columns: ["", "Medicare Advantage", "Medigap"],
        rows: [
          [
            "Monthly premium",
            "Often low or zero, in addition to your Part B premium",
            "Higher, and depends on your age, where you live, and the plan letter",
          ],
          [
            "Doctors and hospitals",
            "A network, usually HMO or PPO, and referrals are often needed",
            "Any provider in the country who accepts Original Medicare",
          ],
          [
            "Paying for care",
            "Copays and coinsurance as you use care, up to a yearly out-of-pocket limit",
            "Little or nothing when you get care, depending on the plan letter",
          ],
          [
            "Prescriptions",
            "Typically built into the plan",
            "Not included, so you add a separate Part D plan",
          ],
          [
            "Everyday dental, vision, and hearing",
            "Often included as extras",
            "Not included, so you buy them separately if you want them",
          ],
          [
            "Health questions to join",
            "None, any time you are eligible to enroll",
            "None during your one-time open enrollment window; after it ends, medical underwriting may apply",
          ],
        ],
        note:
          "Benefits, networks, premiums, and availability differ by plan and county and change every year. This explains how the two options generally work, not the details of any particular plan.",
      },

      {
        type: "prose",
        heading: "Enrollment periods you need to know",
        lead:
          "Medicare has several different enrollment periods, and each one does something different. Missing the wrong one can be costly, and sometimes the cost is permanent.",
        bullets: [
          {
            title: "Initial Enrollment Period",
            text:
              "A seven-month window around your 65th birthday: the three months before, the month of your birthday, and the three months after. This is when you enroll in Parts A and B. The rules are different if you are still working and covered by an employer plan, and a mistake there can lead to a late enrollment penalty that lasts for life.",
          },
          {
            title: "Annual Enrollment Period, October 15 to December 7",
            text:
              "Every year during this window you can join, change, or drop a Medicare Advantage or Part D plan, and your new coverage begins January 1. When people talk about open enrollment, this is usually what they mean.",
          },
          {
            title: "Medicare Advantage Open Enrollment, January 1 to March 31",
            text:
              "If you already have a Medicare Advantage plan, you get one opportunity to move to another one or go back to Original Medicare. You cannot use it to join Advantage from Original Medicare, and going back to Original Medicare during this time does not guarantee you can get a Medigap policy.",
          },
          {
            title: "Your Medigap open enrollment period",
            text:
              "A six-month window that starts the first month you are both 65 or older and enrolled in Part B, and it happens only once in your life. During it, you can buy any Medigap policy sold in your state at the standard price, no matter your health. It is the most important window in Medicare, and many people let it pass without realizing it was open.",
          },
        ],
      },

      {
        type: "prose",
        heading: "Why your first choice matters more than the premium",
        body: [
          "You can switch from one Medicare Advantage plan to another every fall for as long as you like, and your health is never a factor. Medigap is different. Once your six-month window ends, insurers in most states can ask about your health, charge you more because of it, or turn you down entirely.",
          "That imbalance is the key point. Picking Advantage at 65 is simple, but in most states it can be hard to reverse years later, once your health has changed and a Medigap policy is what you really want.",
        ],
        link: {
          href: "/guides/medicare-advantage-to-medigap",
          label: "Learn what happens when you try to move to Medigap later",
        },
      },

      {
        type: "prose",
        heading: "Choosing a Part D plan is a separate step",
        body: [
          "The monthly premium is only a small part of what a drug plan costs you. Every plan has a formulary that lists which drugs it covers and at what tier, plus a network of preferred pharmacies where you pay less. The same medication can cost very different amounts on two plans with almost the same premium.",
          "Part D now has a yearly limit on how much you pay out of pocket for covered drugs. Medicare sets that limit and updates it every year. It made a big difference for people on costly medications, which is why it pays to have someone check your actual prescriptions instead of just comparing premiums.",
          "If you do not have creditable drug coverage when you first become eligible, a late enrollment penalty is added to your premium for as long as you have Part D. That applies even if you do not take any medications today.",
        ],
      },
    ],
    faqs: [
      {
        q: "When do I sign up for Medicare for the first time?",
        a: "Most people have an Initial Enrollment Period around their 65th birthday, and there are separate windows for people who wait because they have coverage through an employer. Missing a window can mean late enrollment penalties that last, so confirm your dates with an agent well in advance.",
      },
      {
        q: "How is Medicare Advantage different from a Medicare Supplement?",
        a: "A Supplement, or Medigap policy, works with Original Medicare to pay costs it does not cover, and you add a separate Part D plan for prescriptions. Medicare Advantage is a private plan that delivers all your Medicare benefits in one package, usually with drug coverage and a provider network.",
      },
      {
        q: "Can I switch Medicare plans down the road?",
        a: "Yes. The Annual Enrollment Period each fall lets you change plans, and other windows apply in certain situations. Going from Medicare Advantage to a Supplement later may involve medical underwriting depending on your state and timing, which is why your first decision deserves careful thought.",
      },
      {
        q: "If I do not take any medications, do I still need Part D?",
        a: "Many people sign up anyway, because going without creditable drug coverage can lead to a late enrollment penalty that lasts as long as you have Part D. An agent can explain how the penalty would be calculated for you.",
      },
      {
        q: "Do I keep paying my Part B premium with Medicare Advantage?",
        a: "Yes. Medicare Advantage plans manage your Part A and Part B benefits, but you are still enrolled in Medicare and still pay the Part B premium. Any premium the plan charges is added on top, so a low advertised premium does not necessarily mean low overall cost.",
      },
      {
        q: "Could I be turned down for a Medigap policy?",
        a: "Not during your six-month Medigap open enrollment period. It starts the first month you are 65 or older and enrolled in Part B, and during that time you can buy any policy sold in your state at the standard price regardless of your health. After it ends, insurers in most states can use medical underwriting, meaning they can review your health history, charge more, or decline you. Some states have more generous rules, and there are limited guaranteed issue rights in certain situations, so it is always worth asking.",
      },
    ],
    related: ["health-insurance", "dental-insurance", "final-expense-insurance"],
  },

  {
    slug: "aca-marketplace-plans",
    published: true,
    navGroup: "health",
    navLabel: "ACA Marketplace",
    cardTitle: "ACA Marketplace Coverage",
    h1: "Your Guide to ACA Marketplace Plans",
    metaTitle: "ACA Marketplace Plans and Enrollment Support",
    metaDescription:
      "A plain-language guide to ACA Marketplace plans: enrollment deadlines, qualifying life events, metal tiers, and a straight answer on whether you qualify for help with the premium.",
    pageIntro:
      "Your guide to the Marketplace, from a team that makes sure your enrollment window does not slip by.",
    cardImage: "/assets/img/health/emergency-1.webp",
    cardText:
      "Find ACA Marketplace plans with help on premium tax credits, metal tiers, enrollment deadlines, and the life events that let you sign up mid-year.",
    cardIcon: "fas fa-file-shield",
    cardFeatures: ["Savings Check", "Deadline Tracking"],
    heroImage: "/assets/img/pages/aca-marketplace.webp",
    heroImageAlt: "Licensed agent walking a family through Marketplace plan options and enrollment dates",
    heading: "Getting Covered Through the Marketplace",
    description:
      "Health insurance usually is not on anyone's mind until life forces the issue, and by then the calendar may already have decided for you. The Marketplace is only open for a limited period each year. If you miss it and do not have a qualifying reason, you wait for the next one, and that is the most costly mistake we help people avoid. While enrollment is open, we look at your household income, your doctors, and your prescriptions and show you what each plan will really cost over the whole year, not just each month. While it is closed, we tell you straight whether anything in your life qualifies you to enroll, and what your options are if nothing does.",
    features: [
      {
        icon: "fas fa-calendar-check",
        title: "Never Miss Your Window",
        text: "Open Enrollment happens once a year, and state exchanges can set their own dates. We keep track of yours so it does not slip past.",
      },
      {
        icon: "fas fa-door-open",
        title: "Life Changes That Count",
        text: "Losing coverage, moving, getting married or divorced, having a baby, or adopting can give you a limited window to enroll outside the yearly period.",
      },
      {
        icon: "fas fa-hand-holding-dollar",
        title: "Lower Your Premium",
        text: "Tax credits depend on household income and size, and the cutoffs surprise people both ways. Check before you assume you do or do not qualify.",
      },
      {
        icon: "fas fa-user-doctor",
        title: "Your Doctors and Medications",
        text: "We confirm your doctors and your prescriptions work with the plan before you enroll, not after your first visit.",
      },
    ],
    detailSection: {
      eyebrow: "Enrollment timing",
      heading: "When you can sign up, and what to do when you cannot",
      lead: "The Marketplace is not open all year. Knowing that one rule prevents more problems than anything else here.",
      items: [
        {
          icon: "bi bi-calendar-range",
          title: "The yearly Open Enrollment Period",
          text: "Once a year, anyone can enroll in, change, or drop a plan for any reason. It is the only time you can get coverage without a special reason. The dates have moved in recent years, and state-run exchanges can set their own, so check this year's window for your state instead of going by last year's.",
        },
        {
          icon: "bi bi-lock",
          title: "Outside Open Enrollment, and why applications are denied",
          text: "Once the window closes, the Marketplace stops accepting regular applications. This is not a carrier rule, and no agent can get around it. Every carrier follows the same federal rule, so an application without a qualifying reason is simply declined by the exchange.",
        },
        {
          icon: "bi bi-door-open",
          title: "What lets you enroll mid-year",
          text: "A qualifying life event gives you a short window, usually 60 days from the event, to enroll outside Open Enrollment. The most common are losing existing coverage, such as losing a job, turning too old for a parent's plan, or losing Medicaid; moving to a new coverage area; and household changes like marriage, divorce, a birth, or an adoption. The 60 days start on the date of the event, not when you get to it.",
        },
        {
          icon: "bi bi-file-earmark-check",
          title: "Have your proof ready",
          text: "Most qualifying events now require documents before coverage can begin, such as a termination letter, a lease, a marriage certificate, or a birth record. Having yours on hand when you call can decide whether coverage starts next month or your application gets stuck.",
        },
        {
          icon: "bi bi-shield-plus",
          title: "If you cannot enroll right now",
          text: "There are still options. Medicaid and CHIP take applications all year for anyone who qualifies, with no enrollment window. Short-term, accident, and dental plans can also be bought outside the Marketplace schedule. None of them replaces a Marketplace plan, but a bridge is better than going without, and we will tell you honestly which one makes sense.",
        },
      ],
    },
    contentBlocks: [
      {
        type: "prose",
        heading: "Premium assistance today",
        lead:
          "Premium tax credits are still available. What has changed is who qualifies and how much they get, and it is not the same as it was two years ago.",
        body: [
          "The enhanced credits that were in place from 2021 through 2025 ended when 2025 closed and have not been renewed. As a result, the original income cutoff has returned: above a certain multiple of the federal poverty level, there is no premium tax credit at all, and a household just one dollar over pays the full price. Below that line, credits still apply on a sliding scale and can still be significant.",
          "Cost-sharing reductions are different from premium credits and were not part of what ended. If your income qualifies, they lower your deductible and copays, but only when you choose a Silver plan. It is the most frequently overlooked savings on the Marketplace, because a Silver plan looks more expensive than Bronze until you factor it in.",
          "The income limits are adjusted every year and depend on your household income and size, not just your paycheck. We would rather calculate your real numbers than have you rely on something you read a year ago.",
        ],
      },

      {
        type: "prose",
        heading: "What every Marketplace plan must include",
        lead:
          "Plans vary in price and network. They do not vary on this.",
        body: [
          "Every ACA-compliant plan, whether you buy it on the Marketplace or directly from a carrier, has to cover the ten essential health benefits and cannot turn you down or charge you more for a pre-existing condition. That baseline is identical on the lowest-cost Bronze plan and the priciest Gold plan.",
        ],
        bullets: [
          {
            title: "Free preventive care",
            text:
              "Annual checkups, screenings, and vaccines from in-network providers are covered with no copay, even before you meet your deductible.",
          },
          {
            title: "Hospital and emergency care",
            text: "Emergency services, hospital stays, and surgery.",
          },
          {
            title: "Prescription drugs",
            text:
              "Every plan covers medications, but which ones and at what tier depends on the formulary. If you take something regularly, check it by name.",
          },
          {
            title: "Mental health and substance use care",
            text: "Covered on equal terms with medical and surgical care.",
          },
          {
            title: "Maternity, newborn, and children's care",
            text:
              "This includes pediatric dental and vision, which is why kids' coverage is sometimes part of the medical plan instead of a separate policy.",
          },
        ],
      },

      {
        type: "table",
        heading: "What the metal levels really mean",
        intro:
          "The metal level shows how costs are divided between you and the plan, not how good the coverage is. Bronze and Gold plans from the same carrier often use the same network and the same drug list.",
        columns: ["Tier", "How costs are split", "Usually suits"],
        rows: [
          [
            "Bronze",
            "Lowest premium and highest deductible. You pay most routine costs yourself.",
            "Healthy households that mainly want protection against a worst-case year.",
          ],
          [
            "Silver",
            "In the middle on both. The only level that offers cost-sharing reductions.",
            "Anyone whose income qualifies for cost-sharing reductions, which often makes Silver less expensive than Bronze in practice.",
          ],
          [
            "Gold",
            "Higher premium, with a lower deductible and copays.",
            "Families with ongoing prescriptions or treatment, or a procedure on the calendar.",
          ],
          [
            "Platinum",
            "Highest premium and lowest out-of-pocket costs. Not available in every area.",
            "Frequent, predictable care where you would hit the deductible anyway.",
          ],
        ],
        note:
          "Catastrophic plans are also available to people who meet certain requirements. Which levels you can choose from depends on your county and carrier.",
      },

      {
        type: "prose",
        heading: "Buying a plan off the Marketplace",
        body: [
          "Carriers also sell ACA-compliant plans directly, without using the exchange. These plans have the same protections and the same enrollment deadlines, but premium tax credits cannot be used with them. Sometimes a carrier offers a wider PPO network only on its off-exchange plans, and that is the main reason to consider one.",
          "There is also a separate category of private plans that fall outside the ACA altogether and can be purchased any time of year. They can be useful in certain situations, but they are risky as a replacement for major medical coverage.",
        ],
        link: {
          href: "/guides/off-exchange-health-plans",
          label: "Read our full guide to off-exchange and private health plans",
        },
      },
    ],
    faqs: [
      {
        q: "What does ACA Marketplace plan mean?",
        a: "It is health insurance you purchase for yourself instead of getting it through a job or a program like Medicare or Medicaid. It may be called the Exchange, an Individual and Family plan, or Obamacare. All of these refer to the same set of plans created by the Affordable Care Act.",
      },
      {
        q: "Can I sign up whenever I want?",
        a: "No. The Marketplace is open for a set period each year, and outside of it you need a qualifying life event to enroll. The rules have changed recently, so if you have heard something different, confirm it before relying on it. Give us a call and we will tell you exactly where you stand.",
      },
      {
        q: "Which life events let me enroll outside Open Enrollment?",
        a: "The most common are losing coverage you already had, moving to a new coverage area, getting married or divorced, and having or adopting a child. You usually have 60 days from the event, and you will typically need paperwork to prove it. If something in your life has changed, ask before you assume it does not qualify.",
      },
      {
        q: "I missed Open Enrollment and do not have a qualifying event. What can I do?",
        a: "Start by checking Medicaid and CHIP, which accept applications all year from households that qualify, with no enrollment window. Beyond those, plans like accident or dental coverage can be bought outside the Marketplace schedule and can reduce your risk until the next window opens. We would rather send you somewhere helpful than sell you something that does not fit.",
      },
      {
        q: "Will I qualify for help with my premium?",
        a: "Premium tax credits depend on your household income, the size of your household, and the plans available where you live. The level of help has changed in recent years, so the honest answer is that it depends on your numbers this year, not last year. We can work through them with you before you apply.",
      },
      {
        q: "Is it more expensive to use an agent?",
        a: "No. The carrier sets Marketplace premiums, and they are the same whether you sign up yourself or with a licensed agent. What an agent adds is someone who checks your doctors, keeps track of your deadlines, and answers the phone months later if a claim is denied.",
      },
      {
        q: "What are cost-sharing reductions, and how do I qualify?",
        a: "Cost-sharing reductions lower your deductible, copays, and out-of-pocket maximum instead of your monthly premium. They are separate from premium tax credits, they were not affected when the enhanced credits ended at the close of 2025, and they only apply to Silver plans. If your income qualifies, a Silver plan can cost you less over the full year than a Bronze plan even with the higher premium, so it is an easy trap to avoid.",
      },
      {
        q: "My income is too high for a subsidy. Is the Marketplace still worth it?",
        a: "It depends on where you live. Above the income limit, no premium tax credit is available on any plan, so the exchange offers no financial edge over buying from a carrier directly. In some counties, carriers offer broader PPO networks only on their off-exchange plans, which can make private coverage the better choice. The enrollment deadlines are the same either way.",
      },
    ],
    related: ["health-insurance", "dental-insurance", "accident-insurance"],
  },

  {
    slug: "accident-insurance",
    published: true,
    navGroup: "everyday",
    navLabel: "Accident Insurance",
    cardTitle: "Accident Protection",
    h1: "Accident Coverage for Life's Surprises",
    metaTitle: "Accident Insurance With Cash Benefits",
    metaDescription:
      "Accident insurance sends cash straight to you after a covered injury, with no network or deductible to deal with. Compare plans with a licensed agent.",
    pageIntro:
      "Cash in your pocket after an injury, so an ER visit does not turn into a financial emergency too.",
    cardImage: "/assets/img/health/emergency-2.webp",
    cardText:
      "Add accident coverage to your health plan and get cash paid directly to you after a covered injury, to help with the costs your medical plan does not cover.",
    cardIcon: "fas fa-briefcase-medical",
    cardFeatures: ["Cash Benefits", "Family Coverage"],
    heroImage: "/assets/img/pages/accident.webp",
    heroImageAlt: "Post-surgery X-ray of a wrist fracture on a light box",
    heading: "How Accident Coverage Helps",
    description:
      "Nobody plans for a broken wrist. Then one Saturday there is a fall off a bike, a bad landing on the soccer field, or a slip on a wet floor at work, and suddenly you are facing an emergency room bill, an X-ray, a specialist visit, and a week of lost pay. Your health plan will pay its part in time. Accident insurance covers what falls in between, paying cash directly to you so you can take care of what matters right now, whether that is your deductible, your mortgage, or your groceries. For a small monthly cost, it keeps one rough afternoon from turning into months of catching up.",
    features: [
      {
        icon: "fas fa-hand-holding-dollar",
        title: "Cash That Comes to You",
        text: "Benefits usually go to you instead of the hospital, so you choose which bills to pay first.",
      },
      {
        icon: "fas fa-people-roof",
        title: "Covers the Whole Family",
        text: "Most plans can include your spouse and children, which is where they really pay off in active, sports-loving households.",
      },
      {
        icon: "fas fa-notes-medical",
        title: "Works With Your Health Plan",
        text: "Accident benefits are usually paid in addition to what your medical plan covers, helping with deductibles and coinsurance.",
      },
      {
        icon: "fas fa-file-circle-check",
        title: "Easy to Get Started",
        text: "Many plans have a short application with few health questions, and some do not require a medical exam.",
      },
    ],
    detailSection: {
      eyebrow: "The details",
      heading: "What your plan actually pays for",
      lead: "Accident plans pay fixed amounts for specific events. Knowing which events and how much covers most of the decision.",
      items: [
        {
          icon: "bi bi-list-check",
          title: "The payout schedule",
          text: "Each plan lists what it pays for specific events, such as an ER visit, an ambulance ride, a broken bone, stitches, or a hospital stay. Two plans with similar premiums can pay very different amounts depending on which events carry the bigger benefits, so we compare the schedules, not just the prices.",
        },
        {
          icon: "bi bi-shield-plus",
          title: "A good match for high deductibles",
          text: "A high-deductible health plan lowers your monthly premium but leaves you paying a lot before coverage starts. That tradeoff works for many households until the year someone gets hurt. An accident plan is a popular way to cover that first layer of cost while keeping the lower premium.",
        },
        {
          icon: "bi bi-clipboard-heart",
          title: "Extras to ask about",
          text: "Depending on the carrier, plans may offer accidental death benefits, coverage made for children, and optional riders that add more protection. Whether any of these are available or worth adding depends on your household, not a general rule.",
        },
        {
          icon: "bi bi-exclamation-circle",
          title: "What is not covered",
          text: "Accident plans pay for injuries, not illnesses. Sickness, many pre-existing conditions, and certain high-risk activities are often excluded, and some plans have waiting periods. We review the exclusions with you before you enroll, not after you file a claim.",
        },
      ],
    },
    faqs: [
      {
        q: "How does accident insurance differ from health insurance?",
        a: "Health insurance pays your providers for covered care once your deductible and coinsurance apply. Accident insurance pays you a fixed cash amount when a covered injury happens, and you decide how to spend it. It is designed to work alongside a medical plan, not to replace it.",
      },
      {
        q: "Will I still get paid if my health plan already paid the bill?",
        a: "Usually, yes. Accident benefits are generally paid for the covered event itself, regardless of what your medical plan paid. Terms differ, so confirm how a particular policy works with your other coverage.",
      },
      {
        q: "Which injuries are typically covered?",
        a: "Payout schedules often include ER and urgent care visits, ambulance rides, broken bones and dislocations, burns, cuts that need stitches, concussions, and hospital stays after an accident. The exact list and the amount for each vary by plan.",
      },
      {
        q: "Can my children be covered too?",
        a: "Most plans offer coverage for individuals, couples, and families, and some carriers have plans designed just for kids. Families are often where accident coverage makes the most sense, since sports, playgrounds, and bikes account for a steady number of claims.",
      },
      {
        q: "Is a medical exam required?",
        a: "Often not. Many accident plans use a short application with just a few health questions, and some do not require an exam at all. Requirements vary by carrier, so an agent can tell you what applies to the plan you are looking at.",
      },
    ],
    related: ["health-insurance", "dental-insurance", "life-insurance"],
  },

  {
    // Rendered by its own page file, not by [slug]/page.jsx
    slug: "indexed-universal-life",
    published: true,
    customPage: true,
    navGroup: "life",
    navLabel: "Indexed Universal Life (IUL)",
    cardTitle: "Indexed Universal Life (IUL)",
    metaTitle: "Indexed Universal Life (IUL)",
    cardImage: "/assets/img/health/indexed-universal-life-insurance.jpg",
    cardText:
      "Lifelong life insurance with cash value that can grow based on a market index, plus flexibility to adjust as your financial plans change.",
    cardIcon: "fas fa-chart-line",
    cardFeatures: ["Index-Based Growth", "Coverage for Life"],
  },
];

// --- helpers ---------------------------------------------------------------

export const publishedProducts = products.filter((p) => p.published);

// Products rendered by the dynamic [slug] route.
export const templatedProducts = publishedProducts.filter((p) => !p.customPage);

export function getProduct(slug) {
  return templatedProducts.find((p) => p.slug === slug);
}

export function getAnyProduct(slug) {
  return publishedProducts.find((p) => p.slug === slug);
}

export const productHref = (slug) => `/products/${slug}`;
