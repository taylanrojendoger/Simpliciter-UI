type Task = {
    id: number,
    title: string,
    tags: string[],
    endDate: Date | null,
    state: string,
    description: string
};

export default Task