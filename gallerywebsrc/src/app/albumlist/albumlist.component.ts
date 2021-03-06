import { Component, NgZone, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { PhotoService } from '../services/photo.service';
import { AlbumService } from '../services/album.service';
import { UIStatusService } from '../services/uistatus.service';

import { Album, AlbumPhotoByAlbum } from '../model/album';
import { Photo, UpdPhoto } from '../model/photo';
import { LogLevel } from '../model/common';
import { MdSnackBar } from '@angular/material';
import { UIPagination } from '../model/paginated';

@Component({
  selector: 'acgallery-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumlistComponent implements OnInit {

  public albumes: Album[]  = [];

  constructor(private _authService: AuthService,
    private _albumService: AlbumService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _zone: NgZone,
    private _snackbar: MdSnackBar) {
  }

  ngOnInit() {
    this._albumService.loadAlbums().subscribe(x => {
      this._zone.run(() => {
        this.albumes = [];
        for(let alb of x.contentList) {
          let album = new Album();
          album.init(alb.id, 
            alb.title,
            alb.desp,
            alb.firstPhotoThumnailUrl,
            alb.createdAt,
            alb.createdBy,
            alb.isPublic,
            alb.accessCode,
            alb.photoCount);
          
          this.albumes.push(album);
        }
      });
    }, error => {
    }, () => {
    });
  }

  public onViewAlbumClick(id: number | string): void {
    this._router.navigate(['/album/display/' + id.toString()]);
  }

  public onChangeAlbumMetadata(id: number | string): void {
    this._router.navigate(['/album/edit/' + id.toString()]);
  }
}
