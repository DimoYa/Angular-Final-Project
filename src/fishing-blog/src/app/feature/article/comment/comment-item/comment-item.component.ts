import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmBoxInitializer } from '@costlydeveloper/ngx-awesome-popup';
import CommentModel from 'src/app/core/models/comment-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() comment : CommentModel; 
  @Output() deleteCommentEmitter = new EventEmitter<string>();
  currentuserName: string;
  isAdmin: boolean;
  canModify!: boolean;
  defaultAvatarPath!: string;

  private readonly confirmMsg = 'Are you sure that you want to delete the comment?';
  
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.currentuserName = this.authenticationService.returnUserName();
    this.isAdmin = this.authenticationService.isAdmin();

    this.canModify = this.comment.author === this.currentuserName || this.isAdmin;

    this.defaultAvatarPath = '../../../../assets/profile.png';
  }

  deleteComment(id: string) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle(this.confirmMsg);
    confirmBox.setButtonLabels('YES', 'NO');

    const subscription = confirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.success) {
        this.deleteCommentEmitter.emit(id);
      }
      subscription.unsubscribe();
    });
  }
}
