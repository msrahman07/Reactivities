import { makeAutoObservable, reaction, runInAction } from "mobx";

interface WindowSize {
    width: number;
    height: number;
}

export default class WindowSizeStore {
    windowSize:WindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
    }

    constructor() {
        makeAutoObservable(this);
        // reaction (
        //     () => this.windowSize,
        //     size => {
        //         size.width = window.innerWidth;
        //         size.height = window.innerHeight; 
        //     }
        // )
    }
    setWindowSize = (width:number, height: number) => {
        
    runInAction(() => {
            this.windowSize.width = window.innerWidth;
            this.windowSize.height = window.innerHeight;
        });
    }
}