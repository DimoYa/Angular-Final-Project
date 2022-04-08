import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ConfirmBoxInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { Subscription } from 'rxjs';
import CommentModel from 'src/app/core/models/comment-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment: CommentModel;
  @Output() articleCommentEmitter = new EventEmitter<void>();
  
  currentuserName: string;
  isAdmin: boolean;
  canModify!: boolean;
  editMode: boolean = false;
  defaultAvatarPath!: string;
  subscription: Subscription = new Subscription();

  private readonly confirmMsg =
    'Are you sure that you want to delete the comment?';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private commentService: CommentService
  ) {}

  editCommentForm: FormGroup = this.formBuilder.group({
    content: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.currentuserName = this.authenticationService.returnUserName();
    this.isAdmin = this.authenticationService.isAdmin();

    this.canModify =
      this.comment.author === this.currentuserName || this.isAdmin;

    this.defaultAvatarPath = '../../../../assets/profile.png';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteComment(id: string) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle(this.confirmMsg);
    confirmBox.setButtonLabels('YES', 'NO');

    this.subscription.add(
      confirmBox.openConfirmBox$().subscribe((resp) => {
        if (resp.success) {
          this.subscription.add(
            this.commentService.deleteComment$(id).subscribe(() => {
              this.articleCommentEmitter.emit();
            })
          );
        }
      })
    );
  }

  editComment(commentId: string, articleId: string): void {
    const body: CommentModel = this.editCommentForm.value;
    body.author = this.authenticationService.returnUserName();
    body.authorPicture = this.authenticationService.returnUserPhoto();
    body.articleId = articleId;

    this.subscription.add(
      this.commentService.editComment$(body, commentId).subscribe(() => {
        this.articleCommentEmitter.emit();
        this.editMode = false;
      })
    );
  }

  get f() {
    return this.editCommentForm.controls;
  }

  get invalid() {
    return this.editCommentForm.invalid;
  }
}
