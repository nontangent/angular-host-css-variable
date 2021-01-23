export default function (config, ..._: any[]) {
	config.module.rules = config.module.rules.map((rule: any) => {
		if (rule.test.toString() == /\.scss$|\.sass$/.toString()) {
			rule.use = [...rule.use, 'host-css-variable'];
		}

		return rule;
	})

	/* console.log('rules:', config.module.rules); */

	return config;
}
