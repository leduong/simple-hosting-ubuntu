package Minify;
use nginx;
use CSS::Minifier;
use JavaScript::Minifier;

sub jshandler {
  my $r=shift;
  my $domain = $r->header_in("Host");
  $domain=lc($domain);
  $domain =~s/^www.//g;
  $domain =~ s/:.*$//g;
  my $cache_dir="/tmp";  # Cache directory where minified files will be kept
  my $cache_file=$domain.$r->uri;
  $cache_file=~s!/!_!g;
  $cache_file=join("/", $cache_dir, $cache_file);
  my $uri=$r->uri;
  my $filename=$r->filename;

  return DECLINED unless -f $filename;

  if (! -f $cache_file) {
    open(INFILE, $filename) or die "Error reading file: $!";
    open(OUTFILE, '>' . $cache_file ) or die "Error writting file: $!";
    JavaScript::Minifier::minify(input => *INFILE, outfile => *OUTFILE);
    close(INFILE);
    close(OUTFILE);
  }
  $r->send_http_header("application/javascript");
  $r->sendfile($cache_file);
  return OK;
}
sub csshandler {
  my $r=shift;
  my $domain = $r->header_in("Host");
  $domain=lc($domain);
  $domain =~s/^www.//g;
  $domain =~ s/:.*$//g;
  my $cache_dir="/tmp";  # Cache directory where minified files will be kept
  my $cache_file=$domain.$r->uri;
  $cache_file=~s!/!_!g;
  $cache_file=join("/", $cache_dir, $cache_file);
  my $uri=$r->uri;
  my $filename=$r->filename;

  return DECLINED unless -f $filename;

  if (! -f $cache_file) {
    open(INFILE, $filename) or die "Error reading file: $!";
    open(OUTFILE, '>' . $cache_file ) or die "Error writting file: $!";
    CSS::Minifier::minify(input => *INFILE, outfile => *OUTFILE);
    close(INFILE);
    close(OUTFILE);
  }
  $r->send_http_header("text/css");
  $r->sendfile($cache_file);
  return OK;
}
1;
