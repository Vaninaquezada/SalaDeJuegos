import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild(".container") content: any;
  state: boolean;
  icons: any;
  args: any;
  chatBoxContent: any;
  chatboxStatus: any;
  messages!: Observable<any[]>;
  newMsg = '';
  constructor(private chatSer: ChatService, private router: Router) {
    this.state = false;
  }

  ngOnInit(): void {
    this.messages = this.chatSer.getChatMessages();
    console.log(this.messages)
  }


  toggleState() {
    this.state = !this.state;
    this.showOrHideChatBox();
  }

  showOrHideChatBox() {
    if (this.state) {
      this.chatboxStatus = "chatbox--active";
    } else if (!this.state) {

      this.chatboxStatus = "";

    }
  }

  sendMessage() {
    this.chatSer.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

}
