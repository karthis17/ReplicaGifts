import { Component, ElementRef, ViewChild } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-frames',
  standalone: true,
  imports: [],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})
export class FramesComponent {
  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2') canvas2!: ElementRef<HTMLCanvasElement>;
  private canvas1Fabric!: fabric.Canvas;
  private canvas2Fabric!: fabric.Canvas;

  constructor() { }

  ngAfterViewInit(): void {
    this.canvas1Fabric = new fabric.Canvas(this.canvas1.nativeElement, {
      width: 400,
      height: 600,


      backgroundColor: 'rgba(0, 0, 0, 0)' // Transparent background
    });

    this.canvas2Fabric = new fabric.Canvas(this.canvas2.nativeElement, {
      width: 400,
      height: 600,
      backgroundColor: 'rgba(0, 0, 0, 0)' // Transparent background
    });

    // Load default image onto canvas1
    fabric.Image.fromURL('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6eed28d6-e8da-4210-84ca-6971c6c8f053/da51a2p-6d2ba5ab-4882-4d4d-9a51-5ea937225d04.png/v1/fill/w_998,h_801,strp/pink_blue_frame_shape_by_lashonda1980_da51a2p-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODIyIiwicGF0aCI6IlwvZlwvNmVlZDI4ZDYtZThkYS00MjEwLTg0Y2EtNjk3MWM2YzhmMDUzXC9kYTUxYTJwLTZkMmJhNWFiLTQ4ODItNGQ0ZC05YTUxLTVlYTkzNzIyNWQwNC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.0bBhA7jnjISRoyVSWQq-576HxRYmwRBLIcoGW-m5530', (img) => {
      if (img) {
        img.scaleToWidth(this.canvas1Fabric.width ?? 0);
        img.set({
          selectable: false,
          evented: false,
          top: 0,
          left: 0
        });
        img.scaleToHeight(this.canvas1Fabric.height ?? 0);
        this.canvas1Fabric.add(img);
      }
    });
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          if (img) {
            img.scaleToWidth(this.canvas2Fabric.width ?? 0);
            img.scaleToHeight(this.canvas2Fabric.height ?? 0);
            this.canvas2Fabric.clear();
            this.canvas2Fabric.add(img);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  }
}