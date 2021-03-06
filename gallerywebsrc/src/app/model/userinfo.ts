import { User } from 'oidc-client';

export class UserDetail {
    public UserId: string;
    public DisplayAs: string;
    public Email: string;
    public Others: string;

    public onSetData(data: any) {
        this.UserId = data.userID;
        this.DisplayAs = data.displayAs;
        this.Email = data.email;
        this.Others = data.others;
    }
}

export class UserHistory {
    public UserId: string;
    public SeqNo: number;
    public HistType: number;
    public TimePoint: Date;
    public Others: string;

    public onSetData(data: any) {

        this.UserId = data.userId;
        this.SeqNo = data.seqNo;
        this.HistType = data.histType;
        this.TimePoint = data.timePoint;
        this.Others = data.others;
    }
}

export class UserAuthInfo {
    public isAuthorized: boolean;
    private currentUser: User;
    private userName: string;
    private accessToken: string;
    
    private ForAll: string = 'All';
    private OnlyOwner: string = 'OnlyOwner';

    private galleryAlbumCreate: string;
    private galleryAlbumChange: string;
    private galleryAlbumDelete: string;
    private galleryPhotoUpload: string;
    private galleryPhotoChange: string;
    private galleryPhotoDelete: string;
    private galleryPhotoUploadSize: string;    

    public setContent(user: User) : void {
        if (user) {
            this.currentUser = user;
            this.isAuthorized = true;

            this.userName = user.profile.name;
            this.accessToken = user.access_token;

            this.galleryAlbumCreate = user.profile.GalleryAlbumCreate;
            this.galleryAlbumChange = user.profile.GalleryAlbumChange;
            this.galleryAlbumDelete = user.profile.GalleryAlbumDelete;
            this.galleryPhotoUpload = user.profile.GalleryPhotoUpload;
            this.galleryPhotoChange = user.profile.GalleryPhotoChange;
            this.galleryPhotoDelete = user.profile.GalleryPhotoDelete;
            this.galleryPhotoUploadSize = user.profile.GalleryPhotoUploadSize;
        } else {
            this.cleanContent();
        }
    }

    public cleanContent() : void {
        this.currentUser = null;
        this.isAuthorized = false;
    }

    public getUserName(): string {
        return this.userName;
    }
    public getAccessToken(): string {
        return this.accessToken;
    }
    public getUserUploadKBSize(): Array<number> {
        if (this.galleryPhotoUploadSize) {
            let i = this.galleryPhotoUploadSize.indexOf('-');
            if (i != -1) {
                let minSize = +this.galleryPhotoUploadSize.substr(0, i - 1);
                let maxSize = +this.galleryPhotoUploadSize.substr(i + 1);
                return [minSize, maxSize];
            }
        }

        return [0, 0];
    }
    private getObjectRights(strValue : string, usrName? : string): boolean {
        if (strValue) {
            if (strValue === this.ForAll)
                return true;
            if (strValue === this.OnlyOwner) {
                if (usrName === this.userName)
                    return true;
                return false;
            }
        }

        return false;
    }
    public canCreateAlbum(): boolean {
        return this.getObjectRights(this.galleryAlbumCreate);
    }
    public canChangeAlbum(crterName?: string): boolean {
        return this.getObjectRights(this.galleryAlbumChange, crterName);
    }
    public canDeleteAlbum(crterName?: string): boolean {
        return this.getObjectRights(this.galleryAlbumDelete, crterName);
    }
    public canUploadPhoto(): boolean {
        let brst = this.getObjectRights(this.galleryPhotoUpload);
        if (brst) {
            let sizes = this.getUserUploadKBSize();
            if (sizes[1] <= 0)
                brst = false;
        }

        return brst;
    }
    public canChangePhoto(updrName?: string) {
        return this.getObjectRights(this.galleryPhotoChange, updrName);
    }
    public canDeletePhoto(updrName?: string) {
        return this.getObjectRights(this.galleryPhotoDelete, updrName);
    }    
}
