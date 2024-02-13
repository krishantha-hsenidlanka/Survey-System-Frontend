import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
// ...

@Component({
  selector: 'app-create-question-form',
  templateUrl: './create-question-form.component.html',
  styleUrls: ['./create-question-form.component.css'],
})
export class CreateQuestionFormComponent {
  @Input() index!: number;
  @Input() form!: FormGroup;
  @Input() model: any;

  questionTypes = [
    { label: 'Checklist', value: 'Checklist' },
    { label: 'Text', value: 'Text' },
    { label: 'Number', value: 'Number' },
    // Add other question types as needed
  ];

  fields: FormlyFieldConfig[] = [
    {
      key: `questions.${this.index}.text`,
      type: 'input',
      templateOptions: {
        label: 'Question Text',
        required: true,
      },
    },
    {
      key: `questions.${this.index}.type`,
      type: 'select',
      templateOptions: {
        label: 'Question Type',
        options: this.questionTypes,
        required: true,
      },
    },
    {
      key: `questions.${this.index}.options`,
      type: 'input',
      templateOptions: {
        label: 'Options (Comma-separated)',
      },
      hideExpression: '!model.questions || model.questions.type !== "Checklist"',
    },
  ];

  // ...
}
