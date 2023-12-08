import * as api from './dist/api';

declare global {
    namespace NodeJS {
        interface Global {
            // Runtime API
            allure: typeof api.allure;
            // Pseudo-annotations
            $Description: typeof api.$Description;
            $DescriptionHtml: typeof api.$DescriptionHtml;
            $Epic: typeof api.$Epic;
            $Feature: typeof api.$Feature;
            $Issue: typeof api.$Issue;
            $Link: typeof api.$Link;
            $Owner: typeof api.$Owner;
            $Severity: typeof api.$Severity;
            $Story: typeof api.$Story;
            $Tag: typeof api.$Tag;
            $TmsLink: typeof api.$TmsLink;
            // Decorators
            Attachment: typeof api.Attachment;
            FileAttachment: typeof api.FileAttachment;
            Step: typeof api.Step;
        }
    }

    // Runtime API
    var allure: typeof api.allure;
    // Pseudo-annotations
    var $Description: typeof api.$Description;
    var $DescriptionHtml: typeof api.$DescriptionHtml;
    var $Epic: typeof api.$Epic;
    var $Feature: typeof api.$Feature;
    var $Issue: typeof api.$Issue;
    var $Link: typeof api.$Link;
    var $Owner: typeof api.$Owner;
    var $Severity: typeof api.$Severity;
    var $Story: typeof api.$Story;
    var $Tag: typeof api.$Tag;
    var $TmsLink: typeof api.$TmsLink;
    // Decorators
    var Attachment: typeof api.Attachment;
    var FileAttachment: typeof api.FileAttachment;
    var Step: typeof api.Step;
}
