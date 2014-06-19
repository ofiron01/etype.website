<?php

define("BASE_URL", "http://etype.co.il/ofiroron/dev/etype/");

if (!isset($_GET["action"])) exit();

    switch ($_GET["action"]) {
        case "fileupload":

            $valid_formats = array("doc", "docx", "pdf", "txt","rtf");

            $maxFileSize = (1024 * 1024 * 10); // 10 MB
            $msg = '';
            $response = "failed";
            $target_path = "uploads/";
            $new_filename = "";

            $name = $_FILES['file']['name'];
            $size = $_FILES['file']['size'];
            $tmp = $_FILES['file']['tmp_name'];

            if (strlen($name) > 0) {

                if (	!preg_match('/[^A-Za-z0-9 _ .-]/', $name)	) {

                    $path = pathinfo($name);
                    $ext = $path['extension'];

                    if (	in_array(strtolower($ext), $valid_formats)	) {

                        if ($size < $maxFileSize) {

                            $new_filename = random_string(15) . "." . $ext;
                            if (move_uploaded_file($_FILES['file']['tmp_name'], "../" . $target_path . $new_filename)) {
                                $response = "success";
                                $msg = basename( $_FILES['file']['name']). " has been uploaded!";
                            }

                            else
                                $msg = "Error uploading file, please try again!";

                        } else
                            $msg = "Max image size is ".$maxFileSize." Bytes";

                    } else
                        $msg = "Invalid file, please select a document file!";

                } else
                    $msg = "Illegal file name!";

            } else
                $msg = "Please select document file!";

            echo json_encode(array("status"=>$response, "message"=>$msg, "filename"=>$new_filename));


            break;

        case "sendform":


            require_once('class.phpmailer.php');

            $mail = new PHPMailer();

            $fields = json_decode(stripslashes($_GET["params"]), true);
            $config = json_decode(stripslashes($_GET["config"]), true);

            $mail->AddReplyTo($config["replyTo"],$config["replyToName"]);

            $mail->FromName = $config["fromName"];
            $mail->From =  $config["from"];
            $mail->AddAddress($config["to"], "");
            $mail->AddAddress($fields["Email"], "");

            $mail->Subject    = $config["subject"];

            $msg .= "<img src='".BASE_URL."images/logo_top.png' height='32px' style='vertical-align: middle' /> | Hello, you have a new lead:<br/><br/>";
            $msg .= "<table border='1' style='border:thin solid #cccccc;'>
	            <tr><th colspan='2' align='left'>".$config["client"]." - Lead content</th></tr>";


            foreach($fields as $field_name=>$field_value) {
                if ($field_name == "Filename") {
                    $msg .= "<tr><td align='left' style='width:100px'><strong>" . $field_name . "</strong></td><td>" .
                        BASE_URL . "/srv/uploads/" . $field_value . "</td></tr>";
                } else {
                    $msg .= "<tr><td align='left' style='width:100px'><strong>" . $field_name . "</strong></td><td>" . $field_value . "</td></tr>";
                }

            }

            $msg .= "<tr><td align='left'><strong>Sent:</strong></td><td align='left'>" .  date('l jS \of F Y h:i:s A') . "</td></tr>";


            $mail->MsgHTML($msg);
            $mail->CharSet="UTF-8";


            if(!$mail->send()) {
                echo 'Message could not be sent.';
                echo 'Mailer Error: ' . $mail->ErrorInfo;
            } else {
                echo 'Message has been sent';
            }

            break;
    }


function random_string($length) {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'));

    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }

    return $key;
}

?>