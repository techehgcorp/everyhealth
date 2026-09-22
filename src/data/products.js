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
    cardTitle: "Health Insurance Guidance",
    h1: "Health Insurance for Individuals and Families",
    metaTitle: "Health Insurance for Individuals & Families",
    metaDescription:
      "Compare health insurance plans with licensed guidance on premiums, deductibles, provider networks, and plan types for individuals, families, and the self-employed.",
    pageIntro:
      "Compare plan options with clearer guidance on premiums, deductibles, provider networks, and everyday benefits.",
    cardImage: "/assets/img/health/cardiology-2.webp",
    cardText:
      "Compare plan options, understand deductibles and copays, and choose coverage that matches your healthcare needs and budget.",
    cardIcon: "fas fa-heartbeat",
    cardFeatures: ["Plan Comparison", "Network Review"],
    heroImage: "/assets/img/health/neurology-3.webp",
    heroImageAlt: "Licensed agent reviewing health insurance plan options with a client",
    heading: "Health Insurance Plans",
    description:
      "Health insurance is the one purchase most people make without ever being shown how it works. We help individuals, families, and self-employed members compare options with clearer guidance on premiums, deductibles, provider networks, and the everyday benefits you will actually use. Two plans that look forty dollars apart per month can be two thousand dollars apart by December, and the difference is rarely on the page you are shown first. A licensed agent walks you through the options that genuinely apply to your household, then stays reachable for the rest of the year.",
    features: [
      {
        icon: "fas fa-list-check",
        title: "Plan Comparison",
        text: "Review plan types side by side so you can weigh monthly costs, out-of-pocket exposure, and provider access.",
      },
      {
        icon: "fas fa-hospital",
        title: "Network Guidance",
        text: "Understand which doctors, specialists, hospitals, and pharmacies are included before you enroll.",
      },
      {
        icon: "fas fa-stethoscope",
        title: "Benefit Review",
        text: "Get help interpreting copays, coinsurance, preventive care, prescriptions, and urgent care coverage.",
      },
      {
        icon: "fas fa-file-medical",
        title: "Enrollment Support",
        text: "Move through applications and plan changes with step-by-step support that keeps the process simple.",
      },
    ],
    detailSection: {
      eyebrow: "How we help",
      heading: "From first quote through enrollment",
      lead: "Most people do not need more plan choices. They need help understanding the ones in front of them.",
      items: [
        {
          icon: "bi bi-clipboard-check",
          title: "Coverage assessment",
          text: "We start with your doctors, prescriptions, expected care for the year, and monthly budget. That narrows a long plan list down to a handful worth comparing.",
        },
        {
          icon: "bi bi-diagram-2",
          title: "Side-by-side comparison",
          text: "Deductibles, copays, coinsurance, networks, and drug tiers laid out together, so the tradeoff between a lower premium and higher out-of-pocket costs is visible before you decide.",
        },
        {
          icon: "bi bi-calendar-check",
          title: "Enrollment and renewal",
          text: "Help with application timing, required documents, and the annual review when your plan changes for the coming year. Carriers adjust networks and drug lists every year, and a plan that fit last year does not always fit this one.",
        },
      ],
    },
    faqs: [
      {
        q: "What is the difference between an HMO and a PPO?",
        a: "An HMO usually costs less each month and asks you to stay inside its network, often with a primary care doctor coordinating referrals. A PPO costs more but gives you wider provider choice and generally lets you see specialists directly. Which is better depends entirely on whether the doctors you want are in the narrower network.",
      },
      {
        q: "Can I get health insurance if I am self-employed?",
        a: "Yes. Being self-employed does not limit your options, and it often makes an individual plan the natural route. Premiums may also be deductible depending on your situation, which is worth raising with your tax preparer once you have picked a plan.",
      },
      {
        q: "How do I know if my doctor is covered?",
        a: "Provider networks vary by plan, and published directories are not always current. We check network participation for your specific doctors and pharmacies before you enroll rather than after.",
      },
      {
        q: "When can I enroll?",
        a: "It depends on the type of coverage. Plans bought through the ACA Marketplace are only available during a defined window each year unless a qualifying life event opens one for you. Our ACA Marketplace page covers the timing rules in detail, and we are happy to tell you over the phone exactly where you stand today.",
      },
      {
        q: "Is there a fee for working with an agent?",
        a: "No. Carriers set premiums, and the price is the same whether you sign up yourself or through a licensed agent. What changes is that someone checks your providers before you commit and picks up the phone when a claim gets denied later.",
      },
    ],
    related: ["aca-marketplace-plans", "accident-insurance", "dental-insurance"],
  },

  {
    slug: "life-insurance",
    published: true,
    navGroup: "life",
    navLabel: "Life Insurance",
    cardTitle: "Life Insurance Planning",
    h1: "Life Insurance Planning",
    metaTitle: "Term and Permanent Life Insurance",
    metaDescription:
      "Term, permanent, and final expense life insurance compared, including the living benefit riders that let you access coverage while you are alive.",
    pageIntro:
      "Protection built around income replacement, family goals, and the people who depend on you.",
    cardImage: "/assets/img/service/service1.png",
    cardText:
      "Support choosing term or permanent life insurance based on income protection, legacy goals, and final expense planning.",
    cardIcon: "fas fa-shield-alt",
    cardFeatures: ["Term Life", "Permanent Coverage"],
    heroImage: "/assets/img/health/life-products-hero.webp",
    heroImageAlt: "Family reviewing life insurance coverage options together",
    heading: "Life Insurance Protection",
    description:
      "Our team helps clients evaluate life insurance options that can protect income, support long-term family goals, and provide peace of mind for the future. The right answer depends on what you are protecting against and for how long, which is the conversation most quote tools skip entirely.",
    features: [
      {
        icon: "fas fa-hourglass-half",
        title: "Term Life Options",
        text: "Find affordable protection for a set period with coverage designed around mortgages, children, and income replacement.",
      },
      {
        icon: "fas fa-infinity",
        title: "Permanent Coverage",
        text: "Explore whole life and other lasting options that can support estate planning and final expense goals.",
      },
      {
        icon: "fas fa-people-roof",
        title: "Family Protection",
        text: "Build a financial safety net that helps loved ones manage major expenses if the unexpected happens.",
      },
      {
        icon: "fas fa-file-signature",
        title: "Policy Guidance",
        text: "Get help understanding riders, benefit amounts, underwriting, and how to choose the right policy type.",
      },
    ],
    detailSection: {
      eyebrow: "Choosing coverage",
      heading: "How much, and for how long",
      lead: "Two questions decide most of it. Everything else is detail.",
      items: [
        {
          icon: "bi bi-calculator",
          title: "Sizing the benefit",
          text: "Outstanding mortgage, remaining income years, childcare and education costs, and existing savings. Coverage should close the gap those leave behind, not follow a rule of thumb.",
        },
        {
          icon: "bi bi-calendar-range",
          title: "Term or permanent",
          text: "Term costs less and covers a defined window such as the years until a mortgage is paid or children finish school. Permanent coverage lasts for life and can build cash value, which matters for estate and legacy planning.",
        },
        {
          icon: "bi bi-heart-pulse",
          title: "Riders and underwriting",
          text: "Living benefit riders, waiver of premium, and child riders change what a policy does. Health history, age, and tobacco use change what it costs. We review both before you apply.",
        },
      ],
    },
    contentBlocks: [
      {
        type: "prose",
        eyebrow: "The part most people have not heard",
        heading: "A policy you may be able to use while you are alive",
        lead:
          "Most people think life insurance is something that pays out after they die. That has not been the whole story for a long time.",
        body: [
          "Many modern policies include, or let you add, riders that let you access part of your own death benefit early if you are diagnosed with a qualifying serious illness. These are usually called living benefits or accelerated death benefit riders, and they exist across the industry rather than at any one company.",
          "The money comes to you, not to a hospital, and it is not restricted to medical bills. People use it for the mortgage while they are not working, for treatment a health plan will not cover, for travel to a specialist, or simply to stop the household finances collapsing during the worst year of their life. Whatever you use is deducted from the benefit your family receives later.",
        ],
        bullets: [
          {
            title: "Terminal illness",
            text:
              "The longest-established version, and often included at no additional premium. Triggered by a diagnosis with a limited life expectancy as defined in the policy.",
          },
          {
            title: "Chronic illness",
            text:
              "Generally triggered when you are unable to perform a set number of activities of daily living, or need substantial supervision due to cognitive impairment.",
          },
          {
            title: "Critical illness",
            text:
              "Triggered by a specific diagnosis listed in the rider, commonly conditions such as heart attack, stroke, or cancer. The exact list is defined by the policy.",
          },
        ],
      },

      {
        type: "prose",
        heading: "What living benefits do not do",
        body: [
          "These riders are worth understanding properly rather than being sold on. Availability, cost, and the trigger definitions vary considerably by policy, and some are included while others carry an additional charge or reduce the benefit by more than the amount you take.",
          "A rider is also not a substitute for health insurance, disability coverage, or long-term care insurance. It overlaps with all three and replaces none of them. What it does is put cash in your hands quickly, on your terms, at a moment when most other sources of money have gone quiet.",
          "The definitions in the rider are what govern a claim, not the summary on any website including this one. Read them before you buy, and ask someone to walk you through the trigger language specifically.",
        ],
      },

      {
        type: "table",
        heading: "Term, permanent, and final expense",
        intro:
          "Three different jobs. Most households need one of them, some need two at different stages, and almost nobody needs all three at once.",
        columns: ["", "Term life", "Permanent life", "Final expense"],
        rows: [
          [
            "How long it lasts",
            "A set period, commonly 10, 20, or 30 years",
            "Your whole life, as long as it is funded",
            "Your whole life",
          ],
          [
            "Typical benefit size",
            "Large, scaled to income and debts",
            "Large, scaled to income, estate, or legacy goals",
            "Small, scaled to a funeral and final bills",
          ],
          [
            "Relative cost",
            "Lowest cost per dollar of coverage",
            "Substantially higher than term for the same benefit",
            "Low monthly cost, high cost per dollar of coverage",
          ],
          [
            "Builds cash value",
            "No",
            "Yes, and how it grows depends on the policy type",
            "Little or none",
          ],
          [
            "Underwriting",
            "Usually a health questionnaire, sometimes an exam",
            "Usually full underwriting including an exam",
            "Health questions or none at all",
          ],
          [
            "Usually chosen for",
            "Replacing income while a mortgage and children depend on it",
            "Lifelong coverage, estate planning, or cash value goals",
            "Making sure a funeral is not paid for out of someone's savings",
          ],
        ],
        note:
          "Permanent life covers several policy types including whole life and indexed universal life, which behave quite differently from each other.",
      },

      {
        type: "prose",
        heading: "Where the permanent options differ",
        body: [
          "Whole life is the predictable one. Premiums are fixed, the cash value grows at a guaranteed rate, and very little about it changes over the decades. If you want a policy you can set up and largely leave alone, this is that policy.",
          "Indexed universal life is more flexible and more demanding. Premiums and the death benefit can be adjusted within limits, and cash value growth is linked to the performance of a market index subject to caps, floors, and participation rates. It needs reviewing periodically rather than being left in a drawer, and it is genuinely unsuitable for anyone who will not do that.",
        ],
        link: {
          href: "/products/indexed-universal-life",
          label: "How indexed universal life works, including the tradeoffs",
        },
      },

      {
        type: "prose",
        heading: "Why two people with the same history get different prices",
        body: [
          "Carriers do not underwrite identically. A condition one company rates up, another may accept at standard rates, and the gap between the two on the same applicant can be significant. Build, family history, a medication you take, a sport you do at weekends, and how recently something was treated are all weighed differently depending on where you apply.",
          "That is the practical argument for using a broker rather than applying directly to whoever advertised at you. Knowing which companies view a particular history more favourably is not something you can look up, and applying to the wrong one first leaves a declination on your record that the next application has to answer for.",
          "What nobody can do is make the price better than your health and age allow. The single largest factor in what you pay is when you apply, and that only moves in one direction.",
        ],
        link: {
          href: "/guides/how-much-life-insurance",
          label: "Work out how much coverage you actually need",
        },
      },
    ],

    faqs: [
      {
        q: "How much life insurance do I actually need?",
        a: "It depends on what your household would need to cover if your income stopped: remaining mortgage balance, years of income replacement, childcare and education costs, and final expenses, less any savings and existing coverage. A licensed agent can work through those numbers with you rather than guessing at a multiple of salary.",
      },
      {
        q: "What is the difference between term and permanent life insurance?",
        a: "Term life covers a set number of years and generally costs less for the same death benefit. Permanent life insurance is designed to last your lifetime and may build cash value over time. Which fits depends on whether you are protecting a temporary obligation or a lifelong one.",
      },
      {
        q: "Can I get life insurance with a health condition?",
        a: "Often yes. Carriers underwrite differently, and a condition that raises the rate with one company may be viewed more favorably by another. Some policies also use simplified underwriting with fewer health questions. Knowing where to apply matters more than most people expect.",
      },
      {
        q: "Does life insurance get more expensive as I get older?",
        a: "Generally yes. Premiums are priced largely on age and health at the time you apply, and a policy issued today locks in that rate for its term. Waiting usually costs more.",
      },
      {
        q: "What are living benefits, and do they cost extra?",
        a: "Living benefits are riders that let you access part of your own death benefit early if you are diagnosed with a qualifying terminal, chronic, or critical illness. The money is paid to you and can be used for anything, and whatever you take is deducted from what your beneficiary receives later. Terminal illness riders are often included at no additional premium; chronic and critical illness riders may carry a charge or reduce the benefit by more than the amount accessed. Availability and the definitions that trigger a claim vary by policy, so they are worth reviewing line by line before you buy.",
      },
      {
        q: "What happens when my term policy ends?",
        a: "Coverage simply stops, and there is no refund of what you paid. Most term policies do allow you to renew annually afterwards, though the premium rises steeply each year, and many include a conversion option that lets you exchange the policy for permanent coverage without new health questions. That conversion right usually expires before the term does, which makes it one of the more valuable and more commonly missed features in a policy. If your term is approaching its end, raise it well before the final year.",
      },
    ],
    related: ["indexed-universal-life", "final-expense-insurance", "health-insurance"],
  },

  {
    slug: "final-expense-insurance",
    published: true,
    navGroup: "life",
    navLabel: "Final Expense",
    cardTitle: "Final Expense",
    h1: "Final Expense Insurance",
    metaTitle: "Final Expense Insurance and Burial Coverage",
    metaDescription:
      "Final expense insurance for funeral and burial costs. Simplified and guaranteed issue options explained, with typical costs, explained by a licensed Florida agent.",
    pageIntro:
      "Coverage sized for funeral costs, burial expenses, and the bills that follow.",
    cardImage: "/assets/img/health/final_expense.png",
    cardText:
      "Plan ahead for funeral costs, burial expenses, and other end-of-life needs with coverage designed to ease the financial burden on loved ones.",
    cardIcon: "fas fa-hand-holding-heart",
    cardFeatures: ["Funeral Costs", "Family Support"],
    heroImage: "/assets/img/health/final_expense.png",
    heroImageAlt: "Older couple discussing final expense insurance planning at home",
    heading: "Final Expense Planning",
    description:
      "Final expense coverage helps families prepare for funeral costs, burial expenses, and other end-of-life needs with straightforward benefits designed for peace of mind. Benefit amounts are smaller than traditional life insurance and applications are usually simpler, which makes it a practical option for people who want a specific bill covered rather than broad income replacement.",
    features: [
      {
        icon: "fas fa-file-invoice-dollar",
        title: "Funeral Cost Planning",
        text: "Review coverage amounts that can help with funeral services, burial costs, cremation, and related arrangements.",
      },
      {
        icon: "fas fa-hand-holding-heart",
        title: "Family Support",
        text: "Choose benefits that can reduce financial pressure on loved ones during a difficult time.",
      },
      {
        icon: "fas fa-clipboard-check",
        title: "Simplified Options",
        text: "Compare plans with easier application steps, predictable premiums, and benefit levels matched to your goals.",
      },
      {
        icon: "fas fa-shield-alt",
        title: "Legacy Protection",
        text: "Coordinate final expense coverage with broader life insurance needs so your plan feels complete.",
      },
    ],
    detailSection: {
      eyebrow: "What to expect",
      heading: "Small policies, straightforward applications",
      lead: "Final expense is built to be easy to qualify for and easy to leave behind.",
      items: [
        {
          icon: "bi bi-cash-stack",
          title: "Right-sized benefit",
          text: "Coverage is typically set to match expected funeral, burial or cremation, and related costs rather than long-term income needs. That keeps premiums manageable on a fixed income.",
        },
        {
          icon: "bi bi-clipboard-heart",
          title: "Simplified underwriting",
          text: "Many final expense policies use health questions instead of a medical exam. Some are guaranteed issue, though those often include a waiting period before the full benefit applies.",
        },
        {
          icon: "bi bi-lock",
          title: "Level premiums",
          text: "Most policies are designed so the premium does not increase with age and the benefit does not decrease, which makes the cost predictable year to year.",
        },
      ],
    },
    contentBlocks: [
      {
        type: "prose",
        heading: "What a final expense policy actually does",
        lead:
          "It is whole life insurance, sized to cover a bill your family will face within days of your death rather than decades of lost income.",
        body: [
          "Coverage amounts typically run between $2,000 and $50,000. The benefit is paid in cash to the person you name, and it is generally not taxed as income to them. Because the policy is permanent, it does not expire on a set date the way a term policy does, and because the amounts are small, the monthly cost stays manageable on a fixed income.",
        ],
        bullets: [
          {
            title: "Coverage that does not expire",
            text:
              "As long as premiums are paid, the policy stays in force for life. There is no term end date to outlive.",
          },
          {
            title: "Premiums locked at issue",
            text:
              "Most final expense policies are level premium, meaning the rate is set by your age and health when you apply and does not rise as you get older.",
          },
          {
            title: "A benefit that does not shrink",
            text:
              "The face amount stays where you set it. Some competing products reduce the payout over time, which is worth asking about specifically.",
          },
          {
            title: "No medical exam in most cases",
            text:
              "Underwriting is usually a short set of health questions rather than a physical, blood work, or lab results.",
          },
          {
            title: "The money is not restricted to the funeral",
            text:
              "Your beneficiary receives cash and decides how to spend it. Many families put part of it toward outstanding medical bills, travel for relatives, or the everyday costs that do not pause for a funeral.",
          },
        ],
      },

      {
        type: "prose",
        heading: "What families actually use the money for",
        body: [
          "Funeral homes generally require payment in full before services are held, which is what puts families under pressure at the worst possible moment. A final expense benefit is designed to arrive before that bill is due, usually within days of a claim being filed, without waiting on probate.",
        ],
        bullets: [
          {
            title: "Funeral and burial costs",
            text: "Professional services, casket, vault, cemetery plot, opening and closing fees, and a grave marker.",
          },
          {
            title: "Cremation costs",
            text: "Cremation services, urn, and a memorial or celebration of life.",
          },
          {
            title: "Unpaid bills",
            text: "Remaining medical balances, hospice costs, or credit card debt left behind.",
          },
          {
            title: "Estate settlement",
            text: "Legal and probate fees, or property taxes that come due while an estate is being sorted out.",
          },
        ],
        link: {
          href: "/guides/funeral-costs",
          label: "See a full breakdown of what a funeral costs and where the money goes",
        },
      },

      {
        type: "table",
        heading: "Final expense compared with traditional whole life",
        intro:
          "Both are permanent life insurance. They are built for different jobs, and the underwriting is where you feel the difference.",
        columns: ["", "Final expense", "Traditional whole life"],
        rows: [
          [
            "What it is for",
            "Burial costs and immediate debts",
            "Income replacement and leaving a legacy",
          ],
          [
            "Typical coverage",
            "$2,000 to $50,000",
            "$100,000 to $1,000,000 and above",
          ],
          [
            "Underwriting",
            "No exam; health questions or none at all",
            "Full medical exam, labs, and records review",
          ],
          [
            "Time to approval",
            "Often minutes to a few days",
            "Commonly three to six weeks",
          ],
        ],
        note:
          "Coverage limits, age bands, and approval times vary by carrier and by state.",
      },

      {
        type: "prose",
        heading: "Two ways to qualify",
        lead:
          "Final expense policies are generally offered from about age 50 to 85, though the range varies by carrier. Which type you qualify for depends entirely on how the insurer handles your health history.",
        body: [
          "Neither type requires a medical exam. The difference is whether you answer health questions at all, and that one difference changes your rate, your maximum coverage, and, most importantly, when the full benefit becomes payable.",
        ],
      },

      {
        type: "table",
        heading: "Simplified issue compared with guaranteed issue",
        columns: ["", "Simplified issue", "Guaranteed issue"],
        rows: [
          ["Medical exam", "No", "No"],
          [
            "Health questions",
            "Yes, a short questionnaire",
            "None at all",
          ],
          [
            "Approval",
            "Usually fast, based on your answers",
            "Guaranteed within the carrier's age range",
          ],
          [
            "When the full benefit starts",
            "Typically day one, though some products are graded",
            "After a waiting period, commonly two to three years",
          ],
          [
            "Maximum coverage",
            "Often up to $40,000 to $50,000",
            "Lower, frequently capped near $25,000",
          ],
          [
            "Cost per dollar of coverage",
            "Lower",
            "Higher, since the insurer takes on unscreened risk",
          ],
        ],
        note:
          "Figures are typical of the market rather than guaranteed. Waiting periods, caps, and age limits are set by each carrier and differ by state.",
      },

      {
        type: "prose",
        heading: "Simplified issue: apply here first",
        body: [
          "You answer a short set of health questions on the application. The carrier verifies your answers against prescription history and other databases rather than sending you for an exam, which is why a decision often comes back the same day.",
          "Most simplified issue policies pay the full benefit from day one, so if you pass away shortly after approval your beneficiary receives the whole face amount. Some products in this category are graded instead, so confirm which you are being offered before you sign.",
          "This is the right starting point for anyone in good or moderate health, including plenty of people managing controlled conditions such as high blood pressure, controlled diabetes, or high cholesterol. Answer the questions honestly. More conditions qualify for immediate, lower-cost coverage than most people expect.",
        ],
      },

      {
        type: "prose",
        heading: "Guaranteed issue: the fallback that cannot turn you down",
        body: [
          "Guaranteed issue asks no health questions and runs no health checks. If you meet the age requirement, you are approved. That is genuinely valuable for someone who has been declined elsewhere, and it comes with a specific tradeoff you need to understand before applying.",
          "Because the insurer is accepting unscreened risk, these policies carry a graded waiting period, commonly two to three years. If death occurs from natural causes during that window, the policy does not pay the full face amount. Instead your beneficiary receives the premiums you paid back, and most carriers add interest on top. After the waiting period ends, the full benefit is payable. Accidental death is usually covered in full from day one, but that is a policy-specific term worth confirming in writing.",
          "This is built for people with severe, chronic, or terminal conditions who cannot get through a health questionnaire. It is a real safety net, and it is the more expensive way to buy the same dollar of coverage.",
        ],
      },

      {
        type: "prose",
        heading: "Which one should you apply for?",
        body: [
          "Apply for simplified issue first if there is any chance you qualify. You get day-one coverage at a lower monthly rate, and being declined costs you nothing but time.",
          "Treat guaranteed issue as the backup. If your health history rules out the questionnaire, it still gets your family the money they will need, and a waiting period on a policy you own beats no policy at all.",
          "A licensed agent can tell you which carriers view your specific conditions most favourably before you apply anywhere, which matters more here than in almost any other line of insurance.",
        ],
      },
    ],

    faqs: [
      {
        q: "How much final expense coverage do most people buy?",
        a: "Benefit amounts are usually sized around expected funeral, burial or cremation, and related costs. Those costs vary by region and by the arrangements a family chooses, so it is worth pricing local services before settling on an amount.",
      },
      {
        q: "Do I need a medical exam to qualify?",
        a: "Usually not. Many final expense policies use a short set of health questions instead of an exam. Guaranteed issue options exist for people who cannot answer those questions favorably, though they typically include a waiting period before the full death benefit is payable.",
      },
      {
        q: "How is final expense different from regular life insurance?",
        a: "It is life insurance, just with a smaller benefit and a simpler application. Traditional life insurance is generally sized to replace income over years. Final expense is sized to cover a specific set of end-of-life costs.",
      },
      {
        q: "Can my family use the money for something other than the funeral?",
        a: "Yes. The benefit is paid to your named beneficiary, who decides how to use it. Many families put it toward outstanding medical bills, travel for relatives, or other costs that come up alongside the funeral.",
      },
    ],
    related: ["life-insurance", "medicare", "indexed-universal-life"],
  },

  {
    slug: "dental-insurance",
    published: true,
    navGroup: "everyday",
    navLabel: "Dental Insurance",
    cardTitle: "Dental Coverage Support",
    h1: "Dental Insurance Plans",
    metaTitle: "Dental Insurance Plans for Individuals and Families",
    metaDescription:
      "Compare dental plans covering cleanings, fillings, and crowns. Licensed help with waiting periods, annual maximums, and provider networks.",
    pageIntro:
      "Plans that lower the cost of cleanings, fillings, and the larger dental work nobody plans for.",
    cardImage: "/assets/img/service/service2.png",
    cardText:
      "Review dental plan options that can help reduce the cost of preventive care, basic procedures, and major dental work for individuals and families.",
    cardIcon: "fas fa-tooth",
    cardFeatures: ["Preventive Benefits", "Major Benefits"],
    heroImage: "/assets/img/health/Dental3.png",
    heroImageAlt: "Patient receiving preventive dental care at a dental office",
    heading: "Dental Coverage",
    description:
      "Dental plans can help lower the cost of routine and major oral care while making preventive visits easier to keep on schedule. Most plans cover cleanings and exams generously and major work less so, which is why the annual maximum and waiting periods usually matter more than the monthly premium.",
    features: [
      {
        icon: "far fa-smile",
        title: "Preventive Care",
        text: "Review coverage for exams, cleanings, and x-rays that support healthy long-term dental habits.",
      },
      {
        icon: "fas fa-tooth",
        title: "Basic Care",
        text: "Understand benefits for fillings, extractions, and other common procedures that members use most.",
      },
      {
        icon: "fas fa-star",
        title: "Major Dental Work",
        text: "Explore plan options that may help with crowns, dentures, bridges, and other larger dental expenses.",
      },
      {
        icon: "fas fa-cog",
        title: "Optional Add-Ons",
        text: "Compare extra benefits such as orthodontic support, broader provider choices, or family-friendly options.",
      },
    ],
    detailSection: {
      eyebrow: "Reading a dental plan",
      heading: "Three numbers that decide the value",
      lead: "Premium is the easy number to compare. These are the ones that determine what you actually pay.",
      items: [
        {
          icon: "bi bi-graph-up",
          title: "Annual maximum",
          text: "The most the plan pays toward your care in a plan year. Once you reach it, remaining costs are yours. This is the number that matters most if major work is likely.",
        },
        {
          icon: "bi bi-hourglass-split",
          title: "Waiting periods",
          text: "Many plans cover preventive care immediately but apply a waiting period before basic or major procedures are covered. If you already know you need a crown, this changes which plan makes sense.",
        },
        {
          icon: "bi bi-people",
          title: "Network and coinsurance",
          text: "In-network dentists are paid at negotiated rates, so staying in network usually costs less. Coinsurance tiers commonly split preventive, basic, and major work at different levels.",
        },
      ],
    },
    faqs: [
      {
        q: "Is there a waiting period before I can use dental coverage?",
        a: "It depends on the plan. Preventive care such as cleanings and exams is often covered right away, while basic and major procedures may have waiting periods. If you have known dental work coming up, tell your agent before choosing a plan.",
      },
      {
        q: "Can I keep my current dentist?",
        a: "If your dentist participates in the plan's network, yes, and you will generally pay less than going out of network. We check network participation for your specific dentist before you enroll.",
      },
      {
        q: "Does dental insurance cover braces?",
        a: "Orthodontic coverage is usually a separate benefit rather than standard, and where it is included it often carries its own lifetime maximum and age limits. It is worth asking about specifically if orthodontics is the reason you are shopping.",
      },
      {
        q: "Can I buy dental coverage without health insurance?",
        a: "Yes. Standalone dental plans are available separately and do not require you to hold a medical plan with the same carrier.",
      },
    ],
    related: ["vision-insurance", "health-insurance", "medicare"],
  },

  {
    slug: "vision-insurance",
    published: true,
    navGroup: "everyday",
    navLabel: "Vision Insurance",
    cardTitle: "Vision Benefits",
    h1: "Vision Insurance Plans",
    metaTitle: "Vision Insurance Plans and Eye Care Benefits",
    metaDescription:
      "Vision plans covering eye exams, glasses, and contacts. Compare frame allowances, lens benefits, and participating providers.",
    pageIntro:
      "Benefits for annual exams, glasses, and contacts, with the allowances spelled out.",
    cardImage: "/assets/img/service/service3.png",
    cardText:
      "Understand vision plans that support routine eye exams, glasses, contact lenses, and access to participating providers and retailers.",
    cardIcon: "fas fa-eye",
    cardFeatures: ["Eye Exams", "Frames and Contacts"],
    heroImage: "/assets/img/health/vision.png",
    heroImageAlt: "Optometrist conducting a routine vision exam",
    heading: "Vision Coverage",
    description:
      "Vision benefits help members stay current with eye exams and reduce the cost of glasses, contacts, and other routine vision needs. Vision plans work differently from medical coverage: instead of deductibles and coinsurance, most use fixed copays and set dollar allowances, which makes it possible to know your cost before you walk into the office.",
    features: [
      {
        icon: "fas fa-eye",
        title: "Annual Eye Exams",
        text: "See how often exams are covered and what those visits include for adults, children, and seniors.",
      },
      {
        icon: "fas fa-glasses",
        title: "Glasses Benefits",
        text: "Compare allowances for frames, lenses, coatings, and lens upgrades across plan options.",
      },
      {
        icon: "fas fa-circle-dot",
        title: "Contact Lens Support",
        text: "Review contact lens benefits, replacement schedules, and how covered amounts apply.",
      },
      {
        icon: "fas fa-store",
        title: "Provider Access",
        text: "Confirm which optometrists, retailers, and vision networks are available before you choose a plan.",
      },
    ],
    detailSection: {
      eyebrow: "How vision plans pay",
      heading: "Allowances, not deductibles",
      lead: "Once you know the three allowances, comparing plans takes about five minutes.",
      items: [
        {
          icon: "bi bi-eyeglasses",
          title: "Exam and frame allowance",
          text: "Most plans cover a routine exam for a fixed copay and put a set dollar amount toward frames. Anything above the allowance is your cost, so the frame allowance is where plans differ most.",
        },
        {
          icon: "bi bi-layers",
          title: "Lens options",
          text: "Single vision, bifocal, and progressive lenses are covered at different levels, and coatings or upgrades such as anti-reflective and photochromic are often priced separately.",
        },
        {
          icon: "bi bi-arrow-repeat",
          title: "Contacts instead of glasses",
          text: "Plans typically let you use the hardware benefit for glasses or contacts in a given period, not both. If you wear both, check which the plan defaults to.",
        },
      ],
    },
    faqs: [
      {
        q: "Does vision insurance cover an eye exam every year?",
        a: "Most plans include a routine eye exam once per plan year for a fixed copay. Some plans run the benefit on a rolling twelve-month cycle rather than a calendar year, so check which applies before scheduling.",
      },
      {
        q: "Can I use my vision benefit for both glasses and contacts?",
        a: "Usually you choose one per benefit period. Plans generally provide a hardware allowance that goes toward either frames and lenses or contact lenses, not both.",
      },
      {
        q: "What happens if the frames I want cost more than the allowance?",
        a: "You pay the difference. Many plans also apply a discount to the amount above the allowance when you use an in-network provider, which softens the overage.",
      },
      {
        q: "Is a medical eye problem covered by vision insurance?",
        a: "Not typically. Vision plans cover routine care such as exams, glasses, and contacts. Medical eye conditions, injuries, and eye surgery generally fall under your health insurance instead.",
      },
    ],
    related: ["dental-insurance", "health-insurance", "medicare"],
  },

  {
    slug: "medicare",
    published: true,
    navGroup: "health",
    navLabel: "Medicare",
    cardTitle: "Medicare Enrollment Help",
    h1: "Medicare Plans and Enrollment Help",
    metaTitle: "Medicare Advantage, Supplement, and Part D Plans",
    metaDescription:
      "Compare Medicare Advantage, Medigap Supplement, and Part D prescription plans with licensed help on eligibility, enrollment deadlines, and annual plan review.",
    pageIntro:
      "Advantage, Supplement, and Part D compared side by side, with deadlines you will not miss.",
    cardImage: "/assets/img/service/service4.png",
    cardText:
      "Guidance through Medicare Advantage, Supplement, and Part D choices with help on deadlines, benefits, and prescription coverage.",
    cardIcon: "fas fa-notes-medical",
    cardFeatures: ["Plan Selection", "Part D Review"],
    heroImage: "/assets/img/health/cardiology-3.webp",
    heroImageAlt: "Licensed agent explaining Medicare plan options to a senior client",
    heading: "Medicare Options",
    description:
      "Medicare decisions can feel complex, so we help members compare Advantage, Supplement, and Part D plans with more clarity and less stress. The first decision, whether to pair Original Medicare with a Supplement and a drug plan or to take an all-in-one Advantage plan, shapes everything after it, and it is easier to get right the first time than to change later.",
    features: [
      {
        icon: "fas fa-heartbeat",
        title: "Medicare Advantage",
        text: "Compare all-in-one plan options that may combine medical, drug, and extra benefits in one place.",
      },
      {
        icon: "fas fa-plus-square",
        title: "Supplement Plans",
        text: "Understand Medigap choices that can help reduce out-of-pocket costs alongside Original Medicare.",
      },
      {
        icon: "fas fa-pills",
        title: "Prescription Coverage",
        text: "Review Part D formularies, preferred pharmacies, and medication costs before you enroll.",
      },
      {
        icon: "fas fa-calendar-check",
        title: "Enrollment Help",
        text: "Get support with eligibility, deadlines, plan changes, and annual review decisions.",
      },
    ],
    detailSection: {
      eyebrow: "The first decision",
      heading: "Two paths through Medicare",
      lead: "Almost everything else follows from which of these you choose.",
      items: [
        {
          icon: "bi bi-signpost-split",
          title: "Original Medicare plus a Supplement",
          text: "Keeps broad access to providers who accept Medicare and uses a Medigap policy to cover much of what Original Medicare leaves behind. Drug coverage is added separately through a Part D plan.",
        },
        {
          icon: "bi bi-box-seam",
          title: "Medicare Advantage",
          text: "A private plan that replaces how you receive Medicare benefits, often bundling drug coverage and extras such as dental or vision. Costs are usually lower up front, with a provider network and plan rules to work within.",
        },
        {
          icon: "bi bi-capsule",
          title: "Checking your prescriptions",
          text: "Drug plans differ by formulary, tier, and preferred pharmacy. The same prescription can cost very differently across two plans, so we check your actual medication list rather than comparing premiums alone.",
        },
      ],
    },
    contentBlocks: [
      {
        type: "prose",
        heading: "The two paths, side by side",
        lead:
          "Both work with Medicare. They handle your costs, your doctors, and your future options in almost opposite ways.",
        body: [
          "Medicare Advantage changes how you receive your Medicare benefits. A private plan approved by Medicare takes over administering your Part A and Part B coverage, usually bundles in prescription drug coverage, and often adds routine dental, vision, or hearing benefits. You keep paying your Part B premium, and the plan's own premium is frequently low or nothing at all. In exchange you work inside a provider network and follow the plan's rules on referrals and prior authorisation.",
          "A Medicare Supplement, or Medigap, does the opposite. You stay in Original Medicare and keep the ability to see any provider in the country who accepts it. The Medigap policy then pays much of what Original Medicare leaves behind. You pay a higher monthly premium for that, and you buy a separate Part D plan for your prescriptions.",
        ],
      },

      {
        type: "table",
        heading: "Medicare Advantage compared with Medigap",
        columns: ["", "Medicare Advantage", "Medigap"],
        rows: [
          [
            "Monthly premium",
            "Often low, sometimes none, on top of your Part B premium",
            "Higher, and varies by your age, location, and the plan letter",
          ],
          [
            "Doctors and hospitals",
            "A network, usually HMO or PPO, with referrals often required",
            "Any provider nationwide who accepts Original Medicare",
          ],
          [
            "How you pay for care",
            "Copays and coinsurance as you go, capped by an annual out-of-pocket maximum",
            "Little or nothing at the point of care, depending on the plan letter",
          ],
          [
            "Prescription drugs",
            "Usually included in the plan",
            "Not included — you buy a separate Part D plan",
          ],
          [
            "Routine dental, vision, hearing",
            "Frequently included as extra benefits",
            "Not included — bought separately if you want it",
          ],
          [
            "Health questions to enrol",
            "None, at any time you are eligible to join",
            "None during your one-time open enrollment window; medical underwriting may apply after it closes",
          ],
        ],
        note:
          "Benefits, networks, premiums, and availability vary by plan and by county, and change each year. This describes how the two categories generally work, not any specific plan.",
      },

      {
        type: "prose",
        heading: "The enrollment windows that matter",
        lead:
          "Medicare runs on several separate calendars, and they do different things. Missing the wrong one is expensive and sometimes permanent.",
        bullets: [
          {
            title: "Initial Enrollment Period",
            text:
              "Seven months around your 65th birthday: the three months before, your birth month, and the three months after. This is when you sign up for Parts A and B. Different rules apply if you are still working and covered by an employer plan, and getting that wrong can mean a late enrollment penalty that never goes away.",
          },
          {
            title: "Annual Enrollment Period, October 15 to December 7",
            text:
              "Every year. You can join, switch, or drop a Medicare Advantage or Part D plan, with coverage starting January 1. This is the window most people mean when they say open enrollment.",
          },
          {
            title: "Medicare Advantage Open Enrollment, January 1 to March 31",
            text:
              "If you are already in a Medicare Advantage plan, you get one chance to switch to a different one or return to Original Medicare. It does not let you join Advantage from Original Medicare, and returning to Original Medicare here does not guarantee you a Medigap policy.",
          },
          {
            title: "Your Medigap open enrollment window",
            text:
              "Six months, beginning the first month you are both 65 or older and enrolled in Part B. Once per lifetime. During it you can buy any Medigap policy sold in your state at the standard rate regardless of your health. This is the single most consequential window in Medicare, and most people spend it without knowing it is open.",
          },
        ],
      },

      {
        type: "prose",
        heading: "Why the first choice deserves more thought than the price tag",
        body: [
          "You can move between Medicare Advantage plans every autumn for the rest of your life, and your health never enters into it. Medigap does not work that way. After your six-month window closes, insurers in most states can ask about your health history, charge you more because of it, or decline you outright.",
          "That asymmetry is the whole game. Choosing Advantage at 65 is easy to do and, in most states, hard to fully undo years later when your health has changed and a Medigap policy has become the thing you want.",
        ],
        link: {
          href: "/guides/medicare-advantage-to-medigap",
          label: "What happens if you try to switch to Medigap later",
        },
      },

      {
        type: "prose",
        heading: "Part D is its own decision",
        body: [
          "Prescription drug plans are priced on far more than the monthly premium. Each plan publishes a formulary listing which drugs it covers and at which tier, and a network of preferred pharmacies where your cost is lower. The same prescription can cost very differently across two plans with nearly identical premiums.",
          "Part D now includes an annual cap on what you pay out of pocket for covered drugs, which is set by Medicare and adjusted each year. It changed the maths considerably for anyone on expensive medication, and it is worth having someone run your actual drug list rather than comparing premiums.",
          "If you go without creditable drug coverage when you first become eligible, a late enrollment penalty is added to your premium and it continues for as long as you have Part D. That is true even if you take nothing today.",
        ],
      },
    ],
    faqs: [
      {
        q: "When should I first enroll in Medicare?",
        a: "Most people have an Initial Enrollment Period tied to turning 65, and there are separate windows for those who delay because they have employer coverage. Missing a window can lead to lasting late enrollment penalties, so it is worth confirming your dates with an agent well ahead of time.",
      },
      {
        q: "What is the difference between Medicare Advantage and a Medicare Supplement?",
        a: "A Supplement, also called Medigap, works alongside Original Medicare to help cover costs it leaves behind, and you add a separate Part D drug plan. Medicare Advantage is a private plan that provides your Medicare benefits in one package, often including drug coverage, usually with a provider network.",
      },
      {
        q: "Can I change my Medicare plan later?",
        a: "There is an Annual Enrollment Period each fall when you can change plans, and other windows apply in certain situations. Moving from Medicare Advantage to a Supplement later can involve medical underwriting depending on your state and timing, which is why the first choice deserves attention.",
      },
      {
        q: "Do I still need a Part D plan if I do not take medications?",
        a: "Many people enroll anyway, because going without creditable drug coverage can trigger a late enrollment penalty that continues for as long as you have Part D. An agent can explain how that penalty is calculated in your case.",
      },
      {
        q: "Do I have to pay the Part B premium if I join a Medicare Advantage plan?",
        a: "Yes. Medicare Advantage plans administer your Part A and Part B benefits, but you remain enrolled in Medicare and continue paying your Part B premium. Any premium the plan charges is on top of that, which is why a plan advertising a low premium is not the same as coverage that costs you little.",
      },
      {
        q: "Can I be turned down for a Medigap policy?",
        a: "During your six-month Medigap open enrollment window, no. It begins the first month you are 65 or older and enrolled in Part B, and during it you can buy any policy sold in your state at the standard rate regardless of your health. After it closes, insurers in most states may use medical underwriting, which means they can review your health history, charge you more, or decline you. A few states have their own rules that are more generous, and there are limited guaranteed issue rights in specific situations, so it is worth asking rather than assuming.",
      },
    ],
    related: ["health-insurance", "dental-insurance", "final-expense-insurance"],
  },

  {
    slug: "aca-marketplace-plans",
    published: true,
    navGroup: "health",
    navLabel: "ACA Marketplace",
    cardTitle: "ACA Marketplace Plans",
    h1: "ACA Marketplace Plans",
    metaTitle: "ACA Marketplace Plans and Enrollment Help",
    metaDescription:
      "ACA Marketplace plans explained without the jargon. Enrollment deadlines, qualifying life events, metal tiers, and an honest read on whether you qualify for premium help.",
    pageIntro:
      "The Marketplace, explained by someone whose job is to make sure you do not miss your window.",
    cardImage: "/assets/img/health/emergency-1.webp",
    cardText:
      "Explore ACA Marketplace options with help on premium tax credits, metal tiers, enrollment timing, and the qualifying life events that open a mid-year window.",
    cardIcon: "fas fa-file-shield",
    cardFeatures: ["Subsidy Review", "Enrollment Timing"],
    heroImage: "/assets/img/health/staff-4.webp",
    heroImageAlt: "Licensed agent walking a family through Marketplace plan options",
    heading: "ACA Marketplace Coverage",
    description:
      "Most people do not think about health insurance until something forces them to, and by then the calendar has usually made the decision for them. The Marketplace only opens for a limited window each year. Miss it without a qualifying reason, and you are waiting until the next one. That is the single most expensive thing we help people avoid. When the window is open we sit down with your household income, your doctors, and your prescriptions and show you what each plan actually costs across a full year rather than just per month. When it is closed, we tell you honestly whether anything in your life opens a door, and what to do if it does not.",
    features: [
      {
        icon: "fas fa-calendar-check",
        title: "Know Your Window",
        text: "Open Enrollment runs once a year, and state exchanges can set their own dates. We track yours so it does not pass you by.",
      },
      {
        icon: "fas fa-door-open",
        title: "Qualifying Life Events",
        text: "Losing coverage, moving, marriage, divorce, a new baby, or an adoption can open a limited window outside the annual period.",
      },
      {
        icon: "fas fa-hand-holding-dollar",
        title: "Premium Help",
        text: "Tax credits are based on household income and size, and the thresholds surprise people in both directions. Worth checking before you assume.",
      },
      {
        icon: "fas fa-user-doctor",
        title: "Doctors and Prescriptions",
        text: "We check your providers and your medication list against the plan before you enroll, not after your first appointment.",
      },
    ],
    detailSection: {
      eyebrow: "Timing",
      heading: "When you can enroll, and what to do when you cannot",
      lead: "The Marketplace is not open year-round. Understanding that one rule saves more headaches than anything else on this page.",
      items: [
        {
          icon: "bi bi-calendar-range",
          title: "The annual Open Enrollment Period",
          text: "Once a year there is a window when anyone can enroll, switch, or drop a plan for any reason. This is the only time coverage is freely available without needing a special reason. Dates have shifted in recent years and state-run exchanges can set their own, so confirm the current window for your state rather than relying on last year's calendar.",
        },
        {
          icon: "bi bi-lock",
          title: "Closed Enrollment, and why applications get rejected",
          text: "Outside that window the Marketplace does not accept general applications. This is not a carrier policy and it is not something an agent can work around. Every carrier operates under the same federal rule, so an application submitted without a qualifying reason is simply turned down by the exchange.",
        },
        {
          icon: "bi bi-door-open",
          title: "What opens a mid-year window",
          text: "A qualifying life event gives you a limited window, generally 60 days from the event, to enroll outside Open Enrollment. Common ones are losing coverage you already had, including job loss, aging off a parent's plan, or losing Medicaid; moving to a new coverage area; and household changes such as marriage, divorce, a birth, or an adoption. The clock starts at the event, not when you get around to it.",
        },
        {
          icon: "bi bi-file-earmark-check",
          title: "Be ready to prove it",
          text: "Qualifying events now generally require documentation before coverage takes effect. A termination letter, a lease, a marriage certificate, a birth record. Having that ready when you call is often the difference between coverage starting next month and an application stalling out.",
        },
        {
          icon: "bi bi-shield-plus",
          title: "If no window is open",
          text: "You still have options worth knowing about. Medicaid and CHIP accept applications year-round for those who qualify, with no enrollment window at all. Short-term, accident, and dental coverage can also be purchased outside the Marketplace calendar. None of these replace a Marketplace plan, but a bridge is better than a gap, and we will tell you plainly which one fits.",
        },
      ],
    },
    contentBlocks: [
      {
        type: "prose",
        heading: "Help with the premium: where things stand now",
        lead:
          "Premium tax credits still exist. What changed is who gets them and how much, and the answer is different than it was two years ago.",
        body: [
          "The enhanced credits that ran from 2021 through 2025 expired at the end of 2025 and have not been reinstated. That means the original income cliff is back: above a set multiple of the federal poverty level, no premium tax credit is available at all, and a household a dollar over the line pays full retail. Below it, credits still apply on a sliding scale and can still be substantial.",
          "Cost-sharing reductions are separate from premium credits and were not part of what expired. If your income qualifies, they lower your deductible and copays, but only on a Silver plan. That is the single most commonly missed piece of money on the Marketplace, because the Silver plan looks more expensive than Bronze right up until you account for it.",
          "The thresholds are indexed and move every year, and they turn on your household income and size rather than your paycheck alone. We would rather run your actual numbers than have you assume from something you read last year.",
        ],
      },

      {
        type: "prose",
        heading: "What every Marketplace plan has to cover",
        lead:
          "Plans differ on price and network. They do not differ on this.",
        body: [
          "Every ACA-compliant plan, on the Marketplace or bought privately, must cover the ten essential health benefits and cannot decline you or charge you more because of a pre-existing condition. That floor is the same on the cheapest Bronze plan and the most expensive Gold one.",
        ],
        bullets: [
          {
            title: "Preventive care at no cost to you",
            text:
              "In-network annual visits, screenings, and immunisations are covered without a copay, before you have met a deductible.",
          },
          {
            title: "Emergency and hospital care",
            text: "Emergency services, inpatient stays, and surgery.",
          },
          {
            title: "Prescriptions",
            text:
              "Every plan covers drugs, though which drugs and at which tier varies by formulary. This is worth checking by name if you take anything regularly.",
          },
          {
            title: "Mental health and substance use treatment",
            text: "Covered at parity with medical and surgical benefits.",
          },
          {
            title: "Maternity, newborn, and paediatric care",
            text:
              "Including paediatric dental and vision, which is why children's coverage sometimes sits inside the medical plan rather than a separate policy.",
          },
        ],
      },

      {
        type: "table",
        heading: "What the metal tiers actually mean",
        intro:
          "The tier describes how you and the plan split costs, not the quality of the coverage. A Bronze plan and a Gold plan from the same carrier often share the same network and the same drug list.",
        columns: ["Tier", "How costs are split", "Usually suits"],
        rows: [
          [
            "Bronze",
            "Lowest premium, highest deductible. You carry most routine costs yourself.",
            "Healthy households budgeting for a worst case rather than everyday care.",
          ],
          [
            "Silver",
            "Middle on both. The only tier where cost-sharing reductions apply.",
            "Anyone whose income qualifies for cost-sharing reductions, which frequently makes Silver cheaper in practice than Bronze.",
          ],
          [
            "Gold",
            "Higher premium, lower deductible and copays.",
            "Households with regular prescriptions, ongoing treatment, or a planned procedure.",
          ],
          [
            "Platinum",
            "Highest premium, lowest out-of-pocket costs. Not offered everywhere.",
            "Heavy, predictable medical use where the deductible would be met regardless.",
          ],
        ],
        note:
          "Catastrophic plans also exist with restricted eligibility. Availability of each tier varies by county and carrier.",
      },

      {
        type: "prose",
        heading: "Buying outside the Marketplace",
        body: [
          "Carriers also sell ACA-compliant coverage directly, without going through the exchange. Those plans carry identical protections and identical enrollment deadlines, and no premium tax credit can be applied to them. Occasionally a carrier reserves a broader PPO network for its off-exchange products, which is the one reason it is genuinely worth considering.",
          "Separately, there is a category of private product that sits outside the ACA entirely and can be bought year-round. Those are useful in specific situations and dangerous as a substitute for major medical.",
        ],
        link: {
          href: "/guides/off-exchange-health-plans",
          label: "Read the full guide to off-exchange and private health plans",
        },
      },
    ],
    faqs: [
      {
        q: "What is an ACA Marketplace plan?",
        a: "It is health coverage you buy on your own rather than through an employer or a program like Medicare or Medicaid. You may hear it called the Exchange, an Individual and Family plan, or an Obamacare plan. They all describe the same marketplace of plans created under the Affordable Care Act.",
      },
      {
        q: "Can I enroll at any time of year?",
        a: "No. The Marketplace opens for a defined window each year, and outside that window you need a qualifying life event to enroll. Enrollment rules have changed in recent years, so if you have heard otherwise, it is worth confirming before you count on it. Call us and we will tell you exactly where you stand today.",
      },
      {
        q: "What counts as a qualifying life event?",
        a: "Losing coverage you already had, moving to a new coverage area, getting married or divorced, and having or adopting a child are the most common. You generally have 60 days from the event, and you will usually need documentation. If something has changed in your life, ask before you assume it does not count.",
      },
      {
        q: "I missed Open Enrollment and nothing qualifies. What now?",
        a: "Check Medicaid and CHIP first, since those accept applications year-round for households that qualify and there is no enrollment window. Beyond that, coverage like accident or dental can be purchased outside the Marketplace calendar and can reduce your exposure until the next window opens. We would rather point you somewhere useful than sell you something that does not fit.",
      },
      {
        q: "Will I get help paying the premium?",
        a: "Premium tax credits are based on household income, household size, and the plans priced in your area. The amount of help available has changed in recent years, so the honest answer is that it depends on your numbers this year, not last year. We can run them with you before you apply.",
      },
      {
        q: "Does going through an agent cost more?",
        a: "No. Marketplace premiums are set by the carrier and are the same whether you enroll on your own or through a licensed agent. What you get by using one is someone who checks your doctors, watches your deadlines, and picks up the phone in March when a claim gets denied.",
      },
      {
        q: "What are cost-sharing reductions, and how do I get them?",
        a: "Cost-sharing reductions lower your deductible, copays, and out-of-pocket maximum rather than your monthly premium. They are separate from premium tax credits, they were not affected by the credits that expired at the end of 2025, and they only apply if you enrol in a Silver plan. If your income qualifies, a Silver plan often costs you less over a full year than a Bronze one despite the higher premium, which is a trap worth avoiding.",
      },
      {
        q: "I make too much for a subsidy. Should I still use the Marketplace?",
        a: "Sometimes, but not always. If you are above the income threshold, no premium tax credit is available on any plan, so the exchange holds no financial advantage over buying directly from a carrier. In some counties carriers reserve broader PPO networks for their off-exchange products, which can make private coverage the better fit. The enrollment deadlines are identical either way.",
      },
    ],
    related: ["health-insurance", "dental-insurance", "accident-insurance"],
  },

  {
    slug: "accident-insurance",
    published: true,
    navGroup: "everyday",
    navLabel: "Accident Insurance",
    cardTitle: "Accident Coverage",
    h1: "Accident Insurance Plans",
    metaTitle: "Accident Insurance Plans and Cash Benefits",
    metaDescription:
      "Accident insurance pays cash directly to you after a covered injury, with no networks or deductibles to work around. Compare options with a licensed agent.",
    pageIntro:
      "Money in your hands after a bad day, so a trip to the emergency room does not become a financial one too.",
    cardImage: "/assets/img/health/emergency-2.webp",
    cardText:
      "Supplement your health coverage with accident protection that pays cash directly to you after a covered injury, helping absorb the costs your medical plan leaves behind.",
    cardIcon: "fas fa-briefcase-medical",
    cardFeatures: ["Cash Paid to You", "Family Coverage"],
    heroImage: "/assets/img/health/orthopedics-1.webp",
    heroImageAlt: "Parent comforting a child after a minor injury at home",
    heading: "Accident Coverage",
    description:
      "Nobody plans their year around a broken wrist. But a fall off a bike on a Saturday, a bad landing at a soccer game, a slip on a wet floor at work, and suddenly there is an emergency room bill, an X-ray, a follow-up with a specialist, and a week of missed shifts. Your health plan will handle its share eventually. Accident insurance handles the part in between, paying cash straight to you so you can cover what actually needs covering right now, whether that is the deductible, the mortgage, or the groceries. It is a small monthly cost that keeps one bad afternoon from turning into six months of catching up.",
    features: [
      {
        icon: "fas fa-hand-holding-dollar",
        title: "The Money Comes to You",
        text: "Benefits are generally paid directly to you rather than to the hospital, so you decide what gets covered first.",
      },
      {
        icon: "fas fa-people-roof",
        title: "Built for Families",
        text: "Coverage can usually include a spouse and children, which is where it earns its keep in households with kids in sports.",
      },
      {
        icon: "fas fa-notes-medical",
        title: "Works Alongside Your Health Plan",
        text: "Accident benefits are typically paid on top of whatever your medical coverage pays, helping absorb deductibles and coinsurance.",
      },
      {
        icon: "fas fa-file-circle-check",
        title: "Straightforward to Start",
        text: "Many plans use a short application with limited health questions, and some issue coverage without a medical exam.",
      },
    ],
    detailSection: {
      eyebrow: "How it works",
      heading: "What you are actually buying",
      lead: "Accident plans pay set amounts for specific events. Understanding which events, and how much, is most of the decision.",
      items: [
        {
          icon: "bi bi-list-check",
          title: "The benefit schedule",
          text: "Every plan lists what it pays for specific events: an emergency room visit, an ambulance ride, a fracture, stitches, a night in the hospital. Two plans at similar premiums can pay very differently depending on which of those carry the larger amounts, so we compare the schedules rather than the price tags.",
        },
        {
          icon: "bi bi-shield-plus",
          title: "Why it pairs with a high deductible",
          text: "A high-deductible health plan keeps the monthly premium down and leaves real exposure before coverage begins. For a lot of households that tradeoff makes sense, right up until the year they actually get hurt. An accident plan is a common way to cover that first layer without giving up the lower premium.",
        },
        {
          icon: "bi bi-clipboard-heart",
          title: "Options worth asking about",
          text: "Depending on the carrier, plans can include accidental death benefits, coverage designed for children, and optional riders that extend protection further. Which of those are available, and whether they are worth adding, depends on your household rather than on a general rule.",
        },
        {
          icon: "bi bi-exclamation-circle",
          title: "What it does not cover",
          text: "Accident plans cover injuries, not illness. Sickness, many pre-existing conditions, and certain high-risk activities are commonly excluded, and some plans apply waiting periods. We go through the exclusions with you before you enroll, not after a claim.",
        },
      ],
    },
    faqs: [
      {
        q: "How is accident insurance different from health insurance?",
        a: "Health insurance pays providers for covered care after your deductible and coinsurance apply. Accident insurance pays a set cash benefit directly to you when a covered injury happens, and you choose how to use it. It is built to sit alongside a medical plan, not to replace one.",
      },
      {
        q: "Do I still get paid if my health plan already covered the bill?",
        a: "In most cases yes. Accident benefits are generally paid on the covered event itself rather than on what your medical plan did or did not pay. Terms vary, so it is worth confirming how a specific policy coordinates with your other coverage.",
      },
      {
        q: "What kinds of injuries are usually covered?",
        a: "Benefit schedules commonly include emergency room and urgent care visits, ambulance transport, fractures and dislocations, burns, cuts requiring stitches, concussions, and hospital admission following an accident. The exact list, and the amount paid for each, varies by plan.",
      },
      {
        q: "Can I cover my kids?",
        a: "Most plans offer individual, couple, and family tiers, and some carriers offer coverage designed specifically for children. Families are often where accident coverage makes the most sense, since sports, playgrounds, and bicycles generate a steady share of claims.",
      },
      {
        q: "Do I need a medical exam to qualify?",
        a: "Often not. Many accident plans use a short application with limited health questions, and some are issued without an exam. Requirements differ by carrier, so an agent can tell you what applies to the specific plan you are considering.",
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
    cardTitle: "IUL (Indexed Universal Life Insurance)",
    metaTitle: "Indexed Universal Life (IUL)",
    cardImage: "/assets/img/health/indexed-universal-life-insurance.jpg",
    cardText:
      "Build permanent life insurance protection with cash value growth potential tied to a market index and flexible options for future financial planning.",
    cardIcon: "fas fa-chart-line",
    cardFeatures: ["Index-Linked Growth", "Lifetime Protection"],
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
