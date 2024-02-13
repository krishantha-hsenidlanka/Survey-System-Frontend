import {
  Component,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CreateQuestionFormComponent } from '../create-question-form/create-question-form.component';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
})
export class CreateSurveyComponent {
  form = new FormGroup({});
  model: any = {};
  questions: any[] = [];

  // Define the fields property for the FormlyForm
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Survey Title',
        required: true,
      },
    }
  ];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  addQuestionForm() {
    this.questions.push({});
  }

  // Add a function to handle options for a specific question
  addOptions(index: number, event: any): void {
    if (event.target) {
      this.questions[index].options = event.target.value
        .split(',')
        .map((option: string) => option.trim());
    } else {
      this.questions[index].options = event
        .split(',')
        .map((option: string) => option.trim());
    }
  }

  onSubmit() {
    // Process the survey data, including questions
    console.log(this.model, this.questions);
  }
}
