# Athanor Custom Structures

Custom infrastructure structures for the Kingdom of Athanor, designed for use with **pf2e-kingmaker-tools** and the **V&K Remastered** kingdom building rules.

## Structures

### Level 3 — Base (Infrastructure, 0 lots, 6 RP + 1 Lumber, DC 18)

| Structure | Build Skill | Effect |
|-----------|------------|--------|
| **Planning Office** | Engineering (Trained) | +1 item bonus to Repair Reputation (Decay) |
| **Publicity Office** | Intrigue (Trained) | +1 item bonus to Repair Reputation (Strife) |
| **Town Square** | Arts (Trained) | +1 item bonus to Repair Reputation (Corruption) |
| **Town Watch** | Trade (Trained) | +1 item bonus to Repair Reputation (Crime) |

### Level 9 — Upgrades (Infrastructure, 0 lots, 16 RP + 1 Lumber + 1 Stone, DC 26)

| Structure | Upgrades From | Build Skill | Effect |
|-----------|--------------|------------|--------|
| **Planning Department** | Planning Office | Engineering (Expert) | +2 item bonus to Repair Reputation (Decay) |
| **Information Department** | Publicity Office | Intrigue (Expert) | +2 item bonus to Repair Reputation (Strife) |
| **Public Forum** | Town Square | Arts (Expert) | +2 item bonus to Repair Reputation (Corruption) |
| **City Watch** | Town Watch | Trade (Expert) | +2 item bonus to Repair Reputation (Crime) |

## Installation

1. Copy the `athanor-structures` folder into your Foundry VTT `Data/modules/` directory
2. In Foundry, go to **Settings > Manage Modules** and enable **Athanor Custom Structures**
3. Make sure **pf2e-kingmaker-tools** is also enabled

## Usage

### Method 1: Compendium Drag & Drop
1. Open the **Compendium Packs** tab in the sidebar
2. Find **Athanor Custom Structures** under the folder
3. Drag the structure actor onto your settlement scene
4. The structure will be recognized by pf2e-kingmaker-tools automatically

The compendium is auto-populated the first time the GM loads a world with this module active.

### Method 2: Edit Structure Rules Macro
You can also add these structures via the **Edit Structure Rules** macro from pf2e-kingmaker-tools. Use the structure JSON from `scripts/module.js` (the `ATHANOR_STRUCTURES` array).

## Requirements

- Foundry VTT v14
- PF2e System v7.5.0+
- pf2e-kingmaker-tools v6.0.0+
