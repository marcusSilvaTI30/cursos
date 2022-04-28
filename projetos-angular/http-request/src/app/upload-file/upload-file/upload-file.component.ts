import { environment } from 'src/environments/environment';
import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/porcentagem.rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  progress:number = 0;
  files!: Set<File>;

  constructor(
    private service: UploadFileService
  ) {
  }

  ngOnInit(): void {
  }

  onChange(event:any){

    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    const fileNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel')!.innerHTML = fileNames.join(', ');

    this.progress = 0;
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, environment.BASE_URL+'/upload')
      .pipe(
        uploadProgress(progress => {
          this.progress  = progress
        }),
        filterResponse()
      )
      .subscribe(
        response => console.log("Upload concluído!!")
      )
      // .subscribe(
      //   (event: HttpEvent<Object>) => {
      //     if (event.type === HttpEventType.Response) {
      //       // console.log("Upload concluído!");
      //     }else if(event.type === HttpEventType.UploadProgress){
      //       // const percentDone = Math.round((event.loaded * 100) / (event.total ? event.total : 0));
      //       // this.progress = percentDone;
      //     }
      // });
    }
  }

  onDownloadExcel(){
    this.service.download(environment.BASE_URL + '/downloadExcel')
    .subscribe((res:any) => {
      this.service.handleFile(res, 'teste.xls')
    });
  }

  onDownloadPDF(){
    this.service.download(environment.BASE_URL + '/downloadPDF')
    .subscribe((res:any) => {
      this.service.handleFile(res, 'teste.pdf')
    });
  }

}
