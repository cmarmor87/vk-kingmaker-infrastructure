# V&K Kingmaker Infrastructure Module

Custom infrastructure structures for Pathfinder 2E Kingmaker using **V&K Remastered** kingdom building rules, designed for use with [pf2e-kingmaker-tools](https://github.com/BernhardPossworlds/pf2e-kingmaker-tools).

## Installation

In Foundry VTT, go to **Add-on Modules > Install Module**, paste this manifest URL, and click **Install**:

```
https://github.com/cmarmor87/vk-kingmaker-infrastructure/releases/latest/download/module.json
```

> **Note:** This module is not listed in Foundry's built-in package browser. You must install it using the manifest URL above.

### Manual Installation

1. Download the latest release zip from the [Releases](https://github.com/cmarmor87/vk-kingmaker-infrastructure/releases) page
2. Extract into your Foundry VTT `Data/modules/` directory (the folder should be named `vk-kingmaker-infrastructure`)
3. In Foundry, go to **Settings > Manage Modules** and enable **V&K Kingmaker Infrastructure Module**
4. Make sure **pf2e-kingmaker-tools** is also enabled

## Structures

All structures use the **Infrastructure** trait and occupy **0 lots**.

### Level 3 — Base Structures (6 RP + 1 Lumber, DC 18)

| Structure | Build Skill | Effect |
|-----------|------------|--------|
| **Planning Office** | Engineering (Trained) | +1 item bonus to Repair Reputation (Decay) and Accelerate Project |
| **Publicity Office** | Intrigue (Trained) | +1 item bonus to Repair Reputation (Strife) |
| **Town Square** | Arts (Trained) | +1 item bonus to Repair Reputation (Corruption) |
| **Town Watch** | Trade (Trained) | +1 item bonus to Repair Reputation (Crime) |

### Level 9 — Upgraded Structures (16 RP + 1 Lumber + 1 Stone, DC 26)

| Structure | Upgrades From | Build Skill | Effect |
|-----------|--------------|------------|--------|
| **Planning Department** | Planning Office | Engineering (Expert) | +2 item bonus to Repair Reputation (Decay) and Accelerate Project |
| **Information Department** | Publicity Office | Intrigue (Expert) | +2 item bonus to Repair Reputation (Strife) |
| **Public Forum** | Town Square | Arts (Expert) | +2 item bonus to Repair Reputation (Corruption) |
| **City Watch** | Town Watch | Trade (Expert) | +2 item bonus to Repair Reputation (Crime) |

## Usage

### Method 1: Compendium Drag & Drop (Recommended)
1. Open the **Compendium Packs** tab in the sidebar
2. Find **V&K Infrastructure Structures** under the **V&K Kingmaker Infrastructure** folder
3. Drag the structure actor onto your settlement scene
4. The structure will be recognized by pf2e-kingmaker-tools automatically

The compendium is auto-populated the first time the GM loads a world with this module active.

### Method 2: Edit Structure Rules Macro
You can also add these structures via the **Edit Structure Rules** macro from pf2e-kingmaker-tools. Use the structure JSON from `scripts/module.js` (the `VK_STRUCTURES` array).

## Requirements

- Foundry VTT v14
- PF2e System v7.5.0+
- pf2e-kingmaker-tools v6.0.0+

## License

This module is fan-created content for use with the Pathfinder 2E Kingmaker adventure path. It is not affiliated with or endorsed by Paizo Inc.
