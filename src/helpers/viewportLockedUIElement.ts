import { ScreenElement } from "excalibur";

export class ViewportLockedUIElement extends ScreenElement {
    public x:number = 0;
    public y:number = 0;
    public xRelativeTo:string;
    public yRelativeTo:string;
    public name:string

    public customActions:()=>void;
}