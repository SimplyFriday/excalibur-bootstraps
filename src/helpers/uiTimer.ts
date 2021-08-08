import { Timer, vec } from "excalibur";
import { ViewportLockedUIElement } from "./viewportLockedUIElement";

export class UITimer extends Timer {
    public uiElements:ViewportLockedUIElement[] = [];

    constructor (interval:number) {
        super({
            interval,
            repeats: true
        })

        this.on(this.updateUI);
    }

    private updateUI () {
        this.uiElements.forEach(element => {
            let xPos:number;
            let yPos:number;

            if (element.xRelativeTo) {
                switch(element.xRelativeTo) {
                    case "right":
                        xPos = window.innerWidth + element.x;
                        break;
                    case "left":
                        xPos = element.x;
                        break;
                    case "center":
                        xPos = (window.innerWidth / 2) - (element.width / 2) + element.x;
                        break;
                }
            } else {
                xPos = element.x;
            }

            if (element.yRelativeTo) {
                switch(element.yRelativeTo) {
                    case "bottom":
                        yPos = window.innerHeight + element.y;
                        break;
                    case "top":
                        yPos = element.y;
                        break;
                    case "center":
                        yPos = (window.innerHeight / 2) - (element.height / 2) + element.y;
                        break;
                }
            } else {
                yPos = element.y
            }

            element.pos = vec(xPos, yPos);

            if (element.customActions) {
                element.customActions();
            }
        });
    }
}