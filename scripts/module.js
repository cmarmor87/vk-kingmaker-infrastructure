const ATHANOR_STRUCTURES = [
  {
    "id": "planning-office",
    "name": "Planning Office",
    "level": 3,
    "traits": ["infrastructure"],
    "lots": 0,
    "construction": {
      "skills": [{"skill": "engineering", "proficiencyRank": 1}],
      "dc": 18,
      "rp": 6,
      "lumber": 1
    },
    "activityBonusRules": [
      {"value": 1, "activity": "repair-reputation-decay"}
    ]
  },
  {
    "id": "publicity-office",
    "name": "Publicity Office",
    "level": 3,
    "traits": ["infrastructure"],
    "lots": 0,
    "construction": {
      "skills": [{"skill": "intrigue", "proficiencyRank": 1}],
      "dc": 18,
      "rp": 6,
      "lumber": 1
    },
    "activityBonusRules": [
      {"value": 1, "activity": "repair-reputation-strife"}
    ]
  },
  {
    "id": "town-square",
    "name": "Town Square",
    "level": 3,
    "traits": ["infrastructure"],
    "lots": 0,
    "construction": {
      "skills": [{"skill": "arts", "proficiencyRank": 1}],
      "dc": 18,
      "rp": 6,
      "lumber": 1
    },
    "activityBonusRules": [
      {"value": 1, "activity": "repair-reputation-corruption"}
    ]
  },
  {
    "id": "town-watch",
    "name": "Town Watch",
    "level": 3,
    "traits": ["infrastructure"],
    "lots": 0,
    "construction": {
      "skills": [{"skill": "trade", "proficiencyRank": 1}],
      "dc": 18,
      "rp": 6,
      "lumber": 1
    },
    "activityBonusRules": [
      {"value": 1, "activity": "repair-reputation-crime"}
    ]
  },
  {
    "id": "planning-department",
    "name": "Planning Department",
    "level": 9,
    "traits": ["infrastructure"],
    "lots": 0,
    "upgradeFrom": ["planning-office"],
    "construction": {
      "skills": [{"skill": "engineering", "proficiencyRank": 2}],
      "dc": 26,
      "rp": 16,
      "lumber": 1,
      "stone": 1
    },
    "activityBonusRules": [
      {"value": 2, "activity": "repair-reputation-decay"}
    ]
  },
  {
    "id": "information-department",
    "name": "Information Department",
    "level": 9,
    "traits": ["infrastructure"],
    "lots": 0,
    "upgradeFrom": ["publicity-office"],
    "construction": {
      "skills": [{"skill": "intrigue", "proficiencyRank": 2}],
      "dc": 26,
      "rp": 16,
      "lumber": 1,
      "stone": 1
    },
    "activityBonusRules": [
      {"value": 2, "activity": "repair-reputation-strife"}
    ]
  },
  {
    "id": "public-forum",
    "name": "Public Forum",
    "level": 9,
    "traits": ["infrastructure"],
    "lots": 0,
    "upgradeFrom": ["town-square"],
    "construction": {
      "skills": [{"skill": "arts", "proficiencyRank": 2}],
      "dc": 26,
      "rp": 16,
      "lumber": 1,
      "stone": 1
    },
    "activityBonusRules": [
      {"value": 2, "activity": "repair-reputation-corruption"}
    ]
  },
  {
    "id": "city-watch",
    "name": "City Watch",
    "level": 9,
    "traits": ["infrastructure"],
    "lots": 0,
    "upgradeFrom": ["town-watch"],
    "construction": {
      "skills": [{"skill": "trade", "proficiencyRank": 2}],
      "dc": 26,
      "rp": 16,
      "lumber": 1,
      "stone": 1
    },
    "activityBonusRules": [
      {"value": 2, "activity": "repair-reputation-crime"}
    ]
  }
];

const MODULE_ID = "athanor-structures";
const PACK_NAME = "athanor-custom-structures";
const COMPENDIUM_KEY = `${MODULE_ID}.${PACK_NAME}`;
const IMG_PATH = `modules/${MODULE_ID}/img`;

const STRUCTURE_IMAGES = {
  "planning-office": `${IMG_PATH}/PlanningOffice.webp`,
  "publicity-office": `${IMG_PATH}/PublicityOffice.webp`,
  "town-square": `${IMG_PATH}/TownSquare.webp`,
  "town-watch": `${IMG_PATH}/TownWatch.webp`,
  "planning-department": `${IMG_PATH}/PlanningDepartment.webp`,
  "information-department": `${IMG_PATH}/InformationDepartment.webp`,
  "public-forum": `${IMG_PATH}/PublicForum.webp`,
  "city-watch": `${IMG_PATH}/CityWatch.webp`
};

Hooks.once("init", () => {
  console.log("Athanor Structures | Initializing custom infrastructure structures");
});

Hooks.once("ready", async () => {
  if (!game.modules.get("pf2e-kingmaker-tools")?.active) {
    ui.notifications.warn("Athanor Structures requires pf2e-kingmaker-tools to be active.");
    return;
  }

  if (!game.user.isGM) return;

  const pack = game.packs.get(COMPENDIUM_KEY);
  if (!pack) {
    console.warn("Athanor Structures | Compendium pack not found:", COMPENDIUM_KEY);
    return;
  }

  const wasLocked = pack.locked;
  if (wasLocked) await pack.configure({ locked: false });

  try {
    const existingDocs = await pack.getDocuments();
    const existingIds = new Set(existingDocs.map(d => d.flags?.["pf2e-kingmaker-tools"]?.structureData?.id).filter(Boolean));
    const missing = ATHANOR_STRUCTURES.filter(s => !existingIds.has(s.id));

    if (missing.length > 0) {
      console.log(`Athanor Structures | Adding ${missing.length} structure(s) to compendium...`);
      await populateCompendium(pack, missing);
    } else {
      console.log("Athanor Structures | Compendium up to date with", existingDocs.length, "structures.");
    }

    // Update images on existing actors that still use the default icon
    for (const doc of existingDocs) {
      const structId = doc.flags?.["pf2e-kingmaker-tools"]?.structureData?.id;
      const correctImg = STRUCTURE_IMAGES[structId];
      if (correctImg && doc.img !== correctImg) {
        await doc.update({ img: correctImg, "prototypeToken.texture.src": correctImg });
        console.log(`Athanor Structures | Updated image for ${doc.name}`);
      }
    }
  } finally {
    if (wasLocked) await pack.configure({ locked: true });
  }
});

async function populateCompendium(pack, structures) {
  for (const structure of structures) {
    const actorData = {
      name: structure.name,
      type: "npc",
      img: STRUCTURE_IMAGES[structure.id] || "icons/svg/tower.svg",
      prototypeToken: {
        texture: { src: STRUCTURE_IMAGES[structure.id] || "icons/svg/tower.svg" }
      },
      flags: {
        "pf2e-kingmaker-tools": {
          structureData: structure
        }
      }
    };

    try {
      await Actor.create(actorData, { pack: COMPENDIUM_KEY });
      console.log(`Athanor Structures | Created structure actor: ${structure.name}`);
    } catch (err) {
      console.error(`Athanor Structures | Failed to create ${structure.name}:`, err);
    }
  }
  ui.notifications.info(`Athanor Structures | Created ${structures.length} custom infrastructure structures in the compendium.`);
}
