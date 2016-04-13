import {Page, Modal, NavController} from 'ionic-angular';
import {UserDAO} from '../../dao/user.dao.js';
import {ModalUserPage} from '../modal-user/modal-user';

@Page({
  templateUrl: 'build/pages/user/user.html',
})

export class UserPage {

	static get parameters() {
		return [[NavController]];
	}

	constructor(nav) {
		this.dao = new UserDAO();

		this.dao.getList((data) => {
	      this.listUser = data;
	    });

		this.nav = nav;
	}


	insert(){
		let modal = Modal.create(ModalUserPage);

		modal.onDismiss((data) => {
			this.dao.insert(data, (user) => {
				this.listUser.push(user);
			});
		});

		this.nav.present(modal);
	}

	edit(user){
		let modal = Modal.create(ModalUserPage, { params: user });

		modal.onDismiss((data) => {
			this.dao.edit(data, (user) => {
			});
		});

		this.nav.present(modal);
	}

  delete(user){
    this.dao.delete(user, (user) => {
    	let pos = this.listUser.indexOf(user);
		this.listUser.splice(pos,1);
	});
  }
}
