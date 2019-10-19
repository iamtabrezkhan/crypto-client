// animations.ts
import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {

    fade: trigger('fade', [
        state('void', style({
            opacity: '0'
        })),
        state('*', style({
            opacity: '1'
        })),
        transition('void <=> *', animate('0.3s ease-in-out'))
    ]),
    pop: trigger('pop', [
        state('void', style({
            transform: 'rotateY(90deg) scale(0)'
        })),
        state('*', style({
            transform: 'rotateY(0deg) scale(1)'
        })),
        transition('void => *', animate('0.2s cubic-bezier(.48,.64,.61,1.95)'))
    ]),
    showCheck: trigger('showCheck', [
        state('void', style({
            width: '0'
        })),
        state('*', style({
            width: '1.2rem'
        })),
        transition('void => *', animate('0.1s ease-in'))
    ]),
    popFromBottom: trigger('popFromBottom', [
        state('void', style({
            transform: 'translateY(500px)'
        })),
        state('*', style({
            transform: 'translateY(0px)'
        })),
        transition('void <=> *', animate('0.2s ease-in-out'))
    ]),
    slider: trigger('slider', [
        state('void', style({
            position: 'absolute',
            left: '-310px'
        })),
        state('*', style({
            position: 'absolute',
            left: '0px'
        })),
        transition('void <=> *', animate('0.2s ease-in-out'))
    ])

}