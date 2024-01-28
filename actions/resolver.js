class Resolver {
    constructor(source1, source2, tasks, formatter) {
        this.source1 = source1;
        this.source2 = source2;
        this.tasks = Array.isArray(tasks) ? tasks : [tasks];
        this.formatter = formatter;
    }

    async init() {
        this.words1 = (await this.source1()).map(word => word.toLowerCase());
        this.words2 = (await this.source2()).map(word => word.toLowerCase());
    }

    async resolve() {
        await this.init();

        const answers = [];
        this.words1.forEach(word1 => {
            this.words2.forEach(word2 => {
                this.tasks.forEach(task => {
                    const result = task(word1, word2);
                    if (result) answers.push(this.formatter(word1, word2));
                });
            });
        });

        return answers;
    }
}

module.exports = Resolver;
