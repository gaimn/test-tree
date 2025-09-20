 addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        power = new Decimal(1)
	if (hasUpgrade('p', 13)) power = power.times(upgradeEffect('p', 13))
	if (hasUpgrade('e', 11)) power = power.add(0.1)
	return power
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: [
	"energize",
	"reaction",
    ],
    layerShown(){return true},
    upgrades: {
        11: {
    	    title: "Point Power!",
    	    description: "Triple point gain.",
    	    cost: new Decimal(3),
        },
		12: {
    	    title: "Slight Advantage",
    	    description: "Double point gain.",
    	    cost: new Decimal(5),
        },
		13: {
    	    title: "Unusual",
    	    description: "Prestige points boost themselves.",
    	    cost: new Decimal(12),
			effect() {
                return player[this.layer].points.add(1).log10().add(1)
    	    },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
		21: {
    	    title: "It never stops!",
    	    description: "Multiply points by prestige points.",
    	    cost: new Decimal(35),
	    	effect() {
                return player[this.layer].points.add(1).pow(0.5)
    	    },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
})

addLayer("e", {
    name: "energize", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#EBDD81",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "electricity", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
        11: {
    	    title: "Lots of prestige points!",
    	    description: "^1.1 prestige points.",
    	    cost: new Decimal(1),
        },
	12: {
    	    title: "Generator",
    	    description: "Get more points based on electricity.",
    	    cost: new Decimal(7),
	    effect() {
                return player[this.layer].points.add(1).pow(0.166)
    	    },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
})

addLayer("r", {
    name: "reaction", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#6E9E4E",
    requires: new Decimal(500), // Can be a function that takes requirement increases into account
    resource: "booster", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})
