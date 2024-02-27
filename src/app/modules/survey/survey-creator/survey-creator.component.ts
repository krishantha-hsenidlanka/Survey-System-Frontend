import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyCreatorModel } from 'survey-creator-core';
import { ApiService } from '../../../shared/services/api.service';
import { Serializer } from 'survey-core';
import { MatSnackBar } from '@angular/material/snack-bar';

const creatorOptions = {
  // showLogicTab: true,
  isAutoSave: false,
  showJSONEditorTab: true,
  showLogicTab: false,
  showThemeTab: false,
  showFileUpload: false,
};

const defaultJson = {
  pages: [
    {
      name: 'Name',
      elements: [
        {
          name: 'FirstName',
          title: 'Enter your first name:',
          type: 'text',
        },
        {
          name: 'LastName',
          title: 'Enter your last name:',
          type: 'text',
        },
      ],
    },
  ],
};

Serializer.addProperty('survey', {
  name: 'public',
  category: 'general',
  type: 'boolean',
  visibleIndex: 0,
});

@Component({
  selector: 'survey-creator-component',
  templateUrl: './survey-creator.component.html',
  styleUrls: ['./survey-creator.component.css'],
})
export class SurveyCreatorComponent implements OnInit {
  surveyCreatorModel: SurveyCreatorModel;
  surveyId: string | undefined;

  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.surveyCreatorModel = new SurveyCreatorModel(creatorOptions);
  }
  ngOnInit() {
    const creator = new SurveyCreatorModel(creatorOptions);
    creator.toolbox.removeItem('file');
    creator.toolbox.removeItem('image');
    creator.toolbox.removeItem('imagepicker');
    creator.toolbox.removeItem('panel');
    creator.toolbox.removeItem('paneldynamic');
    creator.toolbox.removeItem('signaturepad');

    this.route.params.subscribe((params) => {
      this.surveyId = params['id'];

      if (this.surveyId) {
        // Fetch survey by ID and load into the creator
        this.ApiService.getSurveyById(this.surveyId).subscribe(
          (surveyData) => {
            creator.text =
              JSON.stringify(surveyData) || JSON.stringify(defaultJson);
            console.log(surveyData);
            console.log('Creator Text', creator.text);
          },
          (error) => {
            console.error('Error fetching survey:', error);

            if (error.status == 401) this.openSnackBar('An error occurred');
            if (error.status == 404)
              this.openSnackBar('Survey data is not available');
            if (error.status == 403)
              this.openSnackBar(
                'You do not have permission to view this survey'
              );
            else this.openSnackBar('Error fetching survey!');

            this.router.navigate(['/not-found']);
          }
        );
      }
    });

    creator.saveSurveyFunc = (saveNo: number, callback: Function) => {
      const surveyData = creator.JSON;

      if (this.surveyId) {
        this.ApiService.updateSurvey(this.surveyId, surveyData).subscribe(
          (response) => {
            callback(saveNo, true);
            this.openSnackBar('Survey updated successfully!');
            console.log('Survey updated successfully:', response);
          },
          (error) => {
            console.error('Error updating survey:', error);
            callback(saveNo, false);

            if (error.status == 403) {
              this.openSnackBar(
                'You do not have permission to update this survey!'
              );
            } else if (error.status == 404) {
              this.openSnackBar('Survey not found!');
            } else this.openSnackBar('Error updating survey!');
          }
        );
      } else {
        // Implement logic to create a new survey
      }

      // window.localStorage.setItem("survey-json", creator.text);
      // callback(saveNo, true);
      // console.log(creator.JSON);
      // saveSurveyJson(
      //     "https://your-web-service.com/",
      //     creator.JSON,
      //     saveNo,
      //     callback
      // );
    };
    // creator.onUploadFile.add((_, options) => {
    //   const formData = new FormData();
    //   options.files.forEach((file: File) => {
    //     formData.append(file.name, file);
    //   });
    //   fetch("https://example.com/uploadFiles", {
    //     method: "post",
    //     body: formData
    //   }).then(response => response.json())
    //     .then(result => {
    //       options.callback(
    //         "success",
    //         // A link to the uploaded file
    //         "https://example.com/files?name=" + result[options.files[0].name]
    //       );
    //     })
    //     .catch(error => {
    //       options.callback('error');
    //     });
    // });

    this.surveyCreatorModel = creator;
  }

  ngAfterViewInit() {
    // Execute additional code after the view has initialized
    this.modifySurveyCreatorView();
  }

  private modifySurveyCreatorView() {
    var element = document.querySelector('.svc-creator__area--with-banner');
    if (element) {
      element.classList.remove('svc-creator__area--with-banner');
      element.classList.add('svc-creator__area');
    }

    var banner = document.querySelector('.svc-creator__banner');
    if (banner) {
      // To hide the banner
      // banner.style.visibility = 'hidden';

      // OR to completely remove the banner from the DOM
      banner.remove();
    }

    console.log('Modify Survey Creator View');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}

// function saveSurveyJson(url: string | URL, json: object, saveNo: number, callback: Function) {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     body: JSON.stringify(json)
//   })
//   .then(response => {
//     if (response.ok) {
//       callback(saveNo, true);
//     } else {
//       callback(saveNo, false);
//     }
//   })
//   .catch(error => {
//     callback(saveNo, false);
//   });
// }
