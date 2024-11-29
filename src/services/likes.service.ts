const likesKey = "likes-data-key";
export const likesService = {
    add(id: number): void {
        const likes = this.get();
        likes.push(id);
        localStorage.setItem(likesKey, JSON.stringify(likes));
    },
    remove(id: number): void {
        const likes = this.get();
        const index = likes.indexOf(id);
        likes.splice(index, 1);
        localStorage.setItem(likesKey, JSON.stringify(likes));
    },
    isLiked(id: number): boolean {
        return this.get().includes(id);
    },
    toggle(id: number): void {
        this.isLiked(id) ?
            this.remove(id)
            :
            this.add(id)
    },
    get(): number[] {
        const items = localStorage.getItem(likesKey);
        let likes: number[] = [];
        if (items)
            likes = JSON.parse(items) as number[];
        return likes;
    },
}
