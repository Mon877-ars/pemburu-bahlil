<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Sesuaikan path ini dengan lokasi folder PHPMailer kamu
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if (isset($_POST['kirim'])) {
    $mail = new PHPMailer(true);

    try {
        // --- Setting Server SMTP ---
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'janwardlumbantoruan566@gmail.com'; // Email kamu
        $mail->Password   = ''; // 16 DIGIT APP PASSWORD KAMU
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // --- Setting Pengirim & Penerima ---
        $mail->setFrom('janwardlumbantoruan566@gmail.com', 'Kontak Website');
        $mail->addAddress('janwardlumbantoruan566@gmail.com'); // Email tujuan

        // --- Isi Email ---
        $nama  = $_POST['nama'];
        $email = $_POST['email'];
        $pesan = $_POST['pesan'];

        $mail->isHTML(true);
        $mail->Subject = 'Pesan Baru dari Website';
        $mail->Body    = "<b>Nama:</b> $nama <br> <b>Email:</b> $email <br><br> <b>Pesan:</b><br> $pesan";

        $mail->send();
        echo "<script>alert('Email Berhasil Terkirim!'); window.location='index.html';</script>";
    } catch (Exception $e) {
        echo "Gagal mengirim pesan. Error: {$mail->ErrorInfo}";
    }
}
?>
