import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export class GenericComponent implements OnInit{
    ngOnInit(){

    }

    translate(text: string){
        return text;
    }    
}