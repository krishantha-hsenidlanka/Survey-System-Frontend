import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css'],
})
export class EditUserModalComponent implements OnChanges {
  @Input() user: any;
  @Output() saveChanges = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() updateUser = new EventEmitter<any>(); 

  updatedUser: any = {};
  userRoles: string[] = ['ROLE_USER', 'ROLE_ADMIN'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      const roles = this.user.roles
        ? this.user.roles.map((role: any) => this.getRoles(role))
        : [];
        let role: string[] = [];
        if(roles.length == 1){
           role = ['ROLE_USER'];
        } else if(roles.length == 2){
           role = ['ROLE_ADMIN'];
        } 
      console.log('roles', roles);
      // Initialize updatedUser
      this.updatedUser = {
        username: this.user.username,
        email: this.user.email,
        roles: role,
        enabled: this.user.enabled,
      };
    }
  }

  getRoles(userRole: any): string {
    const roleMatch = userRole && userRole.match(/name=(\w+)/);
    const roleName = roleMatch ? roleMatch[1] : '';
  
  
    return roleName == 'ROLE_ADMIN' ? 'ROLE_ADMIN' : 'ROLE_USER';
  }
  

  onSaveChanges(): void {
    console.log('onSaveChanges', this.updatedUser);
    this.saveChanges.emit(this.updatedUser);
    this.updateUser.emit(this.updatedUser);
    this.updatedUser = {};
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
