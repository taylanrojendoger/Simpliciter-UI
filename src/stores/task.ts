import { defineStore } from 'pinia'
import type Task from '@/types/task'

interface TaskState {
    tasks: Array<Task>,
    isDrawerShown: boolean,
};

export const TaskStore = defineStore({
    id: 'turn-on-off-all-store',
    state: (): TaskState => ({
        tasks: [],
        isDrawerShown: false
    }),
    getters: {
        getIsDrawerShown(): boolean {
            return this.isDrawerShown;
        }
    },
    actions: {
        setInitialTasks(): void {
            this.tasks.push({
                id: Date.now() + Math.floor(Math.random() * 90000),
                title: `Title 2`,
                tags: ["A", "B"],
                endDate: new Date(),
                state: "Completed",
                description: `123453`
            });
            this.tasks.push({
                id: Date.now() + Math.floor(Math.random() * 90000),
                title: `Deneme`,
                tags: ["A", "C"],
                endDate: new Date(),
                state: "Todo",
                description: `ABCD`
            });
        },
        editTask(taskId: number | undefined, title: string, endDate: Date | null, tags: string[]): void {
            const index = this.tasks.findIndex((task: Task) => task.id == taskId)
            if (index > -1) {
                this.tasks[index].title = title;
                this.tasks[index].endDate = endDate;
                this.tasks[index].tags = tags;
            }
            // this.setIsDrawerShown(false);
        },
        setIsDrawerShown(isDrawerShown: boolean): void {
            this.isDrawerShown = isDrawerShown;
        },
        addTask(title: string, endDate: Date | null, tags: string[], description: string): void {
            let id = Date.now();
            let alreadyExists = this.tasks.find((task: Task) => task.id === id);
            if (!alreadyExists) {
                this.tasks.push({
                    id: id,
                    title: title,
                    tags: tags,
                    endDate: endDate,
                    state: "Todo",
                    description: description
                });
            }
        }
    }
});